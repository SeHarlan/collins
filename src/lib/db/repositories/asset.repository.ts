import { Types } from 'mongoose';
import { Asset, AssetDocument, AssetData } from '../models/asset.model';
import { connectDB } from '../connection';

export class AssetRepository {
  /**
   * Create a new asset
   */
  static async create(data: AssetData): Promise<AssetDocument> {
    await connectDB();
    const asset = new Asset(data);
    return asset.save();
  }

  /**
   * Find an asset by ID
   */
  static async findById(id: string): Promise<AssetDocument | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return Asset.findById(id).exec();
  }

  /**
   * Find an asset by asset address
   */
  static async findByAssetAddress(assetAddress: string): Promise<AssetDocument | null> {
    await connectDB();
    return Asset.findOne({ assetAddress }).exec();
  }

  /**
   * Find assets by blockchain
   */
  static async findByBlockchain(blockchain: string): Promise<AssetDocument[]> {
    await connectDB();
    return Asset.find({ blockchain }).exec();
  }

  /**
   * Find all assets
   */
  static async findAll(): Promise<AssetDocument[]> {
    await connectDB();
    return Asset.find().exec();
  }

  /**
   * Update an asset
   */
  static async update(
    id: string,
    data: Partial<AssetData>,
  ): Promise<AssetDocument | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return Asset.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  /**
   * Delete an asset
   */
  static async delete(id: string): Promise<boolean> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return false;
    }
    const result = await Asset.findByIdAndDelete(id).exec();
    return result !== null;
  }

  /**
   * Find or create an asset by asset address
   */
  static async findOrCreate(
    assetAddress: string,
    data?: Partial<Omit<AssetData, 'assetAddress'>>,
  ): Promise<AssetDocument> {
    await connectDB();

    const existingAsset = await Asset.findOne({ assetAddress }).exec();
    if (existingAsset) {
      return existingAsset;
    }

    const newAsset = new Asset({
      assetAddress,
      ...data,
    });
    return newAsset.save();
  }

  /**
   * Find assets by name (case insensitive)
   */
  static async findByName(name: string): Promise<AssetDocument[]> {
    await connectDB();
    return Asset.find({ 
      name: { $regex: name, $options: 'i' } 
    }).exec();
  }

  /**
   * Find assets by partial name or description
   */
  static async search(query: string): Promise<AssetDocument[]> {
    await connectDB();
    return Asset.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).exec();
  }

  /**
   * Get asset count by blockchain
   */
  static async getCountByBlockchain(blockchain: string): Promise<number> {
    await connectDB();
    return Asset.countDocuments({ blockchain }).exec();
  }

  /**
   * Get all unique blockchains
   */
  static async getBlockchains(): Promise<string[]> {
    await connectDB();
    const result = await Asset.distinct('blockchain').exec();
    return result;
  }
}
