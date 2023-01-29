import React from 'react';
import Skeleton from 'react-loading-skeleton';

const FeedCardSkeleton = () => {
    return (
        [...Array(3).keys()].map(i => <div key={i} className='mb-5 p-5 bg-white rounded-lg shadow-md' >
            <div className='flex items-center gap-2 mb-3'>
                <Skeleton circle width={48} height={48} />
                <div className='text-sm'>
                    <Skeleton width={100} />
                    <Skeleton width={200} />
                </div>
                <div className='ml-auto'>
                    <Skeleton className='rounded-lg' width={100} height={48} baseColor="#e0f2fe" />
                </div>
            </div>
            <div className='h-[270px] 2xl:h-[350px]'>
                <Skeleton height="100%" width="100%" />
            </div>
        </div>)
    );
};

export default FeedCardSkeleton;