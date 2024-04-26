const { Schema, SchemaTypes, model, Model, Document } = require("mongoose");

const advertisementScheme = Schema(
  {
    shortText: String,
    description: String,
    images: [String],
    userId: { type: SchemaTypes.ObjectId, ref: "UserModule", required: true },
    tags: [String],
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

advertisementScheme.statics = {
  async search(params) {
    // TODO проверить условия поиска
    try {
      // TODO убрать возвращение пустого масссива и переннести его в контроллеры
      const advertisements =
        (await this.find({ ...params, isDeleted: false })) ?? [];
      return advertisements;
    } catch (error) {
      throw error;
    }
  },
  async create(data) {
    try {
      const advertisement = new this(data);
      return await advertisement.save();
    } catch (error) {
      throw error;
    }
  },
  async remove(id) {
    try {
      const advertisement = await this.findById(id);
      advertisement.isDeleted = true;
      await advertisement.save();
    } catch (error) {
      throw error;
    }
  },
};

module.exports.Advertisement = model("Advertisement", advertisementScheme);
