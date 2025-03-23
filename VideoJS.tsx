import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import * as React from "react";
import videojs from "video.js";

// Styles
import "video.js/dist/video-js.css";

export interface IVideoPlayerProps {
  options: any;
}

const initialOptions: any = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
  autoplay: true,
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({
  options,
}: {
  options: any;
}) => {
  const videoNode = React.useRef<HTMLVideoElement>(null);
  const player = React.useRef<any>();

  React.useEffect(() => {
    player.current = videojs(
      videoNode.current ? videoNode.current : "video-ref",
      {
        ...initialOptions,
        ...options,
      }
    ).ready(function () {
      // console.log('onPlayerReady', this);
    });
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [options]);

  return <video id="video-ref" ref={videoNode} className="video-js" />;
};

export default VideoPlayer;
