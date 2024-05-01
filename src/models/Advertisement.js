const { Schema, SchemaTypes, model } = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const advertisementScheme = Schema(
  {
    shortText: String,
    description: String,
    images: [String],
    userId: {
      type: SchemaTypes.ObjectId,
      ref: "UserModule",
      required: true,
    },
    tags: [String],
    isDeleted: { type: Boolean, default: false, select: false },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

advertisementScheme.query.forRespond = function () {
  return this.populate("user").lean({ virtuals: true });
};

advertisementScheme.plugin(mongooseLeanVirtuals);
advertisementScheme.virtual("user", {
  ref: "UserModule",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
  get: ({ _id, name }) => ({ id: _id, name }),
});

advertisementScheme.statics = {
  search(params) {
    // TODO проверить условия поиска
      return this.find({
        ...params,
        isDeleted: false,
      });
  },
  async create(data) {
    try {
      const advertisement = new this(data);
      return await advertisement.save();
    } catch (error) {
      throw error;
    }
  },
  async delete(id) {
    try {
      const advertisement = await this.findById(id);
      advertisement.isDeleted = true;
      await advertisement.save();
    } catch (error) {
      throw error;
    }
  },
  async isOwnerOf(advId, userId) {
    //TODO можно оптимизировать через  Query Helpers
    const advertisement = await this.findById(advId);
    return advertisement.userId.toString() === userId;
  },
};

module.exports.Advertisement = model("Advertisement", advertisementScheme);
