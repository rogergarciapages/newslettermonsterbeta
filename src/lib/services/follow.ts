// Create new file: src/lib/services/follow.ts
import { prisma } from "@/lib/prisma-client";

export class FollowService {
  static async checkFollowStatus(followerId: string, targetId: string, isUnclaimed: boolean) {
    try {
      const follow = await prisma.follow.findFirst({
        where: {
          follower_id: followerId,
          OR: [
            { following_id: isUnclaimed ? undefined : targetId },
            { following_name: isUnclaimed ? targetId : undefined }
          ]
        }
      });
      return !!follow;
    } catch (error) {
      console.error("Error checking follow status:", error);
      throw new Error("Failed to check follow status");
    }
  }

  static async getFollowerCount(targetId: string, isUnclaimed: boolean) {
    try {
      const count = await prisma.follow.count({
        where: {
          OR: [
            { following_id: isUnclaimed ? undefined : targetId },
            { following_name: isUnclaimed ? targetId : undefined }
          ]
        },
      });
      return count;
    } catch (error) {
      console.error("Error getting follower count:", error);
      throw new Error("Failed to get follower count");
    }
  }

  static async followUser(followerId: string, targetId: string, isUnclaimed: boolean) {
    try {
      const follow = await prisma.follow.create({
        data: {
          follower_id: followerId,
          ...(isUnclaimed
            ? { following_name: targetId }
            : { following_id: targetId })
        }
      });
      return follow;
    } catch (error) {
      console.error("Error following user:", error);
      throw new Error("Failed to follow user");
    }
  }

  static async unfollowUser(followerId: string, targetId: string, isUnclaimed: boolean) {
    try {
      const result = await prisma.follow.deleteMany({
        where: {
          follower_id: followerId,
          OR: [
            { following_id: isUnclaimed ? undefined : targetId },
            { following_name: isUnclaimed ? targetId : undefined }
          ]
        }
      });
      return result.count > 0;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw new Error("Failed to unfollow user");
    }
  }
}