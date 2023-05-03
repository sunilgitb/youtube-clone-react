import { Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { Fragment } from 'react';

const VideoSkelton = ({dir}) =>  {   
    return (
        <Fragment>
            {dir === 'row' || dir === 'rowChannel' && 
                <Stack spacing={1}>
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="rounded" height="160px"/>
                    <div className='flex gap-2 justify-content-center'>
                        <Skeleton variant="circular" width={40} height={40} />
                        <div className='flex flex-col gap-2'>
                            <Skeleton variant="rectangular" width={200} height={30} />
                            <Skeleton variant="rectangular" width={100} height={30} />
                        </div>
                    </div>
                </Stack>
            }
            
        </Fragment>
    );
}
export default VideoSkelton;