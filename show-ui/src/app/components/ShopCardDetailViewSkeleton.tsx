import React from "react";
import { Card, CardContent, Grid, Skeleton, useMediaQuery, useTheme } from "@mui/material";

const ShopCardDetailViewSkeleton: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card className="w-full max-w-5xl mb-6 shadow-md">
      <CardContent>
        {/* Header Skeleton */}
        <Skeleton variant="text" width="40%" height={32} />
        <Skeleton variant="text" width="20%" height={24} />
        <Skeleton variant="text" width="60%" height={20} />

        {/* Divider */}
        <Skeleton variant="rectangular" height={1} className="my-2" />

        {/* Contact & Shop Info Skeleton */}
        <Grid container spacing={2} className="mt-1 mb-3">
          <Grid item xs={12} md={6}>
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                width={`${60 + i * 10}%`}
                height={20}
                className="mb-1"
              />
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                width={`${50 + i * 10}%`}
                height={20}
                className="mb-1"
              />
            ))}
          </Grid>
        </Grid>

        {/* Divider */}
        <Skeleton variant="rectangular" height={1} className="my-2" />

        {/* Inventory Skeleton */}
        {isMobile ? (
          <Grid container spacing={2}>
            {[...Array(2)].map((_, i) => (
              <Grid item xs={12} key={i}>
                <Skeleton variant="rectangular" height={120} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Skeleton variant="rectangular" height={200} />
        )}
      </CardContent>
    </Card>
  );
};

export default ShopCardDetailViewSkeleton;
