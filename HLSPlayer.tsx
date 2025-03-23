import React, { useRef, useState, useEffect, Fragment } from "react";
import ReactDOM, { render } from "react-dom";
import videojs from "video.js";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "video.js/dist/video-js.css";

// those imports are important

const VideoPlayerHLS = ({ url }: { url: string }) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState<any>(undefined);
  const [callFinishVideoAPI, setCallFinishVideoAPI] = useState(false);
  const [vidDuration, setVidDuration] = useState(50000);
  const videoId = "e2280eeb-4cdb-43e7-a34f-36868326b8cb";

  const liveURL = url;
  useEffect(() => {
    if (player) {
      player.src({
        src: liveURL,
        type: "application/x-mpegURL",
        withCredentials: false,
      });
      player.poster("");
      setCallFinishVideoAPI(false);
      setVidDuration(50000);
    }
  }, [videoId, liveURL]);

  useEffect(() => {
    // if (callFinishVideoAPI) {
    // }
  }, [callFinishVideoAPI]);

  useEffect(() => {
    const videoJsOptions = {
      autoplay: true,
      preload: "auto",
      controls: true,
      poster: "",
      sources: [
        {
          src: liveURL,
          type: "application/x-mpegURL",
          withCredentials: false,
        },
      ],
      html5: {
        nativeAudioTracks: true,
        nativeVideoTracks: true,
        nativeTextTracks: true,
      },
    };

    const p = videojs(
      videoRef.current,
      videoJsOptions,
      function onPlayerReady() {
        console.log("onPlayerReady");
      }
    );

    setPlayer(p);

    return () => {
      if (player) player.dispose();
    };
  }, []);

  useEffect(() => {
    if (player?.hlsQualitySelector) {
      player.hlsQualitySelector({ displayCurrentQuality: true });
    }
  }, [player]);
  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        // onLoadedMetadata={(e, px) => {
        //   // console.log(e.target.duration);
        //   setVidDuration(e.target.duration);
        // }}
        onTimeUpdate={(e: any) => {
          if (e.target.currentTime >= vidDuration - 10) {
            setCallFinishVideoAPI(true);
          }
        }}
        style={{ width: "auto" }}
        className="video-js vjs-fluid video-ref-dimensions vjs-controls-enabled vjs-workinghover vjs-v7 vjs-has-started vjs-user-inactive vjs-paused vjs-ended"
      ></video>
    </div>
  );
};

export default VideoPlayerHLS;
