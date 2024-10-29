// src/app/components/brand/profile/header/client-wrapper.tsx
"use client";

import { useState } from "react";
import { BrandProfileProps } from "../types";
import BrandProfileHeader from "./index";

type BrandProfileWrapperOmitProps = Omit<BrandProfileProps, "onFollowChange">;

export default function BrandProfileHeaderWrapper({
  brandName,
  user,
  newsletterCount,
  followersCount: initialFollowersCount,
  isFollowing: initialIsFollowing = false,
  hideFollowButton = false,
  isOwnProfile = false
}: BrandProfileWrapperOmitProps) {
  const [currentFollowersCount, setFollowersCount] = useState(initialFollowersCount);
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleFollowChange = async (newState: boolean) => {
    // Don't handle follow changes if this is the user's own profile
    if (isOwnProfile) return;
    
    if (!user?.user_id && !brandName) return;

    try {
      const response = await fetch(`/api/follow/count?targetId=${user?.user_id || brandName}&isUnclaimed=${!user}`);
      if (response.ok) {
        const data = await response.json();
        setFollowersCount(data.count);
        setIsFollowing(newState);
      }
    } catch (error) {
      console.error("Error updating follow count:", error);
    }
  };

  return (
    <BrandProfileHeader 
      brandName={brandName}
      user={user}
      newsletterCount={newsletterCount}
      followersCount={currentFollowersCount}
      isFollowing={isFollowing}
      onFollowChange={handleFollowChange}
      hideFollowButton={hideFollowButton || isOwnProfile}
      isOwnProfile={isOwnProfile}
    />
  );
}