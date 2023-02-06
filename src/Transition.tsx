import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const Transition: React.FC<{
	type: 'in' | 'out';
	children: React.ReactNode;
}> = ({type, children}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const firstFrame = videoConfig.durationInFrames - 91;
	const progress = spring({
		config: {
			damping: 50,
		},
		fps: videoConfig.fps,
		frame: type === 'in' ? frame : Math.max(0, frame - firstFrame),
    durationInFrames: 10
	});

	const percent = interpolate(
		progress,
		[0, 1],
		type === 'in' ? [100, 0] : [0, 100]
	);

	return (
		<AbsoluteFill
			style={{
				transform: `translateX(${type === 'in' ? percent : 0 - percent}%)`,
        position: 'relative',
			}}
		>
			{children}
		</AbsoluteFill>
	);
};