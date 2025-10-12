import { Types } from 'mongoose';
import { Portfolio, PortfolioDocument, PortfolioData, PortfolioWithNestedAssets, PortfolioAssetsNestedPopulation } from '../models/portfolio.model';
import { connectDB } from '../connection';

export class PortfolioRepository {
  /**
   * Create a new portfolio
   */
  static async create(data: PortfolioData): Promise<PortfolioDocument> {
    await connectDB();
    const portfolio = new Portfolio(data);
    return portfolio.save();
  }

  /**
   * Find a portfolio by ID
   */
  static async findById(id: string): Promise<PortfolioDocument | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return Portfolio.findById(id).exec();
  }

  /**
   * Find a portfolio by ID with nested populated assets
   */
  static async findByIdWithNestedAssets(id: string): Promise<PortfolioWithNestedAssets | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return Portfolio.findById(id).populate(PortfolioAssetsNestedPopulation).exec() as unknown as Promise<PortfolioWithNestedAssets | null>;
  }

  /**
   * Find portfolios by user ID
   */
  static async findByUserId(userId: string): Promise<PortfolioDocument[]> {
    await connectDB();
    if (!Types.ObjectId.isValid(userId)) {
      return [];
    }
    return Portfolio.find({ userId }).exec();
  }

  /**
   * Find portfolios by user ID with nested populated assets
   */
  static async findByUserIdWithAssets(userId: string): Promise<PortfolioWithNestedAssets[]> {
    await connectDB();
    if (!Types.ObjectId.isValid(userId)) {
      return [];
    }
    return Portfolio.find({ userId }).populate(PortfolioAssetsNestedPopulation).exec() as unknown as Promise<PortfolioWithNestedAssets[]>;
  }

  /**
   * Find portfolios by risk level
   */
  static async findByRisk(risk: number): Promise<PortfolioDocument[]> {
    await connectDB();
    return Portfolio.find({ risk }).exec();
  }

  /**
   * Find portfolios by risk level with assets
   */
  static async findByRiskWithAssets(risk: number): Promise<PortfolioWithNestedAssets[]> {
    await connectDB();
    return Portfolio.find({ risk }).populate(PortfolioAssetsNestedPopulation).exec() as unknown as Promise<PortfolioWithNestedAssets[]>;
  }

  /**
   * Find all portfolios
   */
  static async findAll(): Promise<PortfolioDocument[]> {
    await connectDB();
    return Portfolio.find().exec();
  }

  /**
   * Find all portfolios with assets
   */
  static async findAllWithAssets(): Promise<PortfolioWithNestedAssets[]> {
    await connectDB();
    return Portfolio.find().populate(PortfolioAssetsNestedPopulation).exec() as unknown as Promise<PortfolioWithNestedAssets[]>;
  }

  /**
   * Get portfolio count by user
   */
  static async getCountByUser(userId: string): Promise<number> {
    await connectDB();
    if (!Types.ObjectId.isValid(userId)) {
      return 0;
    }
    return Portfolio.countDocuments({ userId }).exec();
  }

  /**
   * Get portfolio count by risk level
   */
  static async getCountByRisk(risk: number): Promise<number> {
    await connectDB();
    return Portfolio.countDocuments({ risk }).exec();
  }

  /**
   * Update a portfolio
   */
  static async update(
    id: string,
    data: Partial<PortfolioData>,
  ): Promise<PortfolioDocument | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return Portfolio.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  /**
   * Add or update asset in portfolio
   */
  static async setAssetAmount(
    portfolioId: string,
    assetId: string,
    amount: string,
  ): Promise<PortfolioDocument | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(portfolioId) || !Types.ObjectId.isValid(assetId)) {
      return null;
    }
    return Portfolio.findOneAndUpdate(
      { 
        _id: portfolioId,
        'assets.assetId': assetId 
      },
      { 
        $set: { 'assets.$.amount': amount } 
      },
      { new: true }
    ).exec() || Portfolio.findByIdAndUpdate(
      portfolioId,
      { 
        $push: { 
          assets: { 
            assetId: new Types.ObjectId(assetId), 
            amount 
          } 
        } 
      },
      { new: true }
    ).exec();
  }

  /**
   * Remove asset from portfolio
   */
  static async removeAsset(
    portfolioId: string,
    assetId: string,
  ): Promise<PortfolioDocument | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(portfolioId) || !Types.ObjectId.isValid(assetId)) {
      return null;
    }
    return Portfolio.findByIdAndUpdate(
      portfolioId,
      { $pull: { assets: { assetId } } },
      { new: true }
    ).exec();
  }

  /**
   * Get asset amount from portfolio
   */
  static async getAssetAmount(
    portfolioId: string,
    assetId: string,
  ): Promise<string | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(portfolioId) || !Types.ObjectId.isValid(assetId)) {
      return null;
    }
    const portfolio = await Portfolio.findOne(
      { 
        _id: portfolioId,
        'assets.assetId': assetId 
      },
      { 'assets.$': 1 }
    ).exec();
    
    return portfolio?.assets[0]?.amount || null;
  }

  /**
   * Delete a portfolio
   */
  static async delete(id: string): Promise<boolean> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return false;
    }
    const result = await Portfolio.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
