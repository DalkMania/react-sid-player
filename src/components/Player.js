import React, { useContext, useEffect } from "react";
import classnames from "classnames";
import { GlobalContext } from "../context/GlobalState";
import { getSIDTitle, getSIDAuthor, getSIDInfo } from "../helpers";
import usePrevious from "../hooks/usePrevious";
import PlayList from "./PlayList";
import { useParams } from "react-router-dom";

import { ReactComponent as PlayButton } from "../assets/svg/play-solid.svg";
import { ReactComponent as PauseButton } from "../assets/svg/pause-solid.svg";
import { ReactComponent as Forward } from "../assets/svg/step-forward-solid.svg";
import { ReactComponent as Backward } from "../assets/svg/step-backward-solid.svg";
import { ReactComponent as Bars } from "../assets/svg/bars-solid.svg";
import "../assets/css/player.css";

const Player = (props) => {
    const { id } = useParams();

    const {
        togglePlaying,
        showPlayList,
        playlistOpen,
        playNextSong,
        playPrevSong,
        playing,
        soundtrack,
        subtune,
        getPlaylistItem,
        getFileInfo,
        fileInfo,
        active,
        currentSongProgress,
        currentSongTime,
        currentSongTotalTime,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        current,
        pause
    } = useContext(GlobalContext);

    const prevCurrent = usePrevious(current);
    const prevPlaying = usePrevious(playing);
    const prevPause = usePrevious(pause);

    const playOrPause = () => {
        if (!playing) {
            return <PlayButton />;
        } else {
            return <PauseButton />;
        }
    };

    useEffect(() => {
        setTimeout(() => {
            window.SIDplayer = new window.jsSID(16384, 0.0005);
            getPlaylistItem(id);
        }, 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTimeout(() => {
            window.SIDplayer.loadinit(process.env.PUBLIC_URL + soundtrack.file, 0);
        }, 200);
    }, [soundtrack.file]);

    useEffect(() => {
        setTimeout(() => {
            let fileInfo = { SidTitle: getSIDTitle(), SidAuthor: getSIDAuthor(), SidInfomation: getSIDInfo() };
            getFileInfo(fileInfo);
        }, 200);
    }, [getFileInfo]);

    useEffect(() => {
        if (current === prevCurrent && playing !== prevPlaying && prevPlaying === true) {
            window.SIDplayer.pause();
            pauseTimer();
        }

        if (current === prevCurrent && playing === true && prevPause === true) {
            window.SIDplayer.playcont();
            resumeTimer();
        }

        if (current !== prevCurrent && currentSongTime === 0 && playing !== false) {
            startTimer();
            window.SIDplayer.start(subtune);
        }
    }, [
        playing,
        current,
        pause,
        subtune,
        startTimer,
        resumeTimer,
        currentSongTime,
        pauseTimer,
        prevCurrent,
        prevPlaying,
        prevPause
    ]);

    useEffect(() => {
        if (currentSongTotalTime === currentSongTime) {
            playNextSong();
        }
    }, [currentSongTotalTime, currentSongTime, playNextSong]);

    useEffect(() => {
        return () => {
            window.SIDplayer.pause();
            resetTimer();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let playerClass = classnames({ show: playlistOpen }, { hidden: !playlistOpen });

    return (
        <div className="player-container">
            <div id="player" className={playerClass}>
                <div id="main" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + soundtrack.poster})` }}>
                    <div>
                        <div className="playback_controls">
                            <h2 id="title">
                                {soundtrack.album} - {active.title}
                            </h2>
                            <h3 id="artist">
                                {fileInfo.SidAuthor} - {fileInfo.SidInfomation}
                            </h3>
                            <div className="time-holder">
                                <div className="slider">
                                    <div className="fill" style={{ width: currentSongProgress + "%" }}></div>
                                </div>
                            </div>
                            <div>
                                <i onClick={showPlayList} className="fa fa-bars menu">
                                    <Bars />
                                </i>
                                <div className="buttons">
                                    <i onClick={playPrevSong} id="back">
                                        <Backward />
                                    </i>
                                    <i onClick={togglePlaying} id="playpause">
                                        {" "}
                                        {playOrPause()}
                                    </i>
                                    <i onClick={playNextSong} id="next">
                                        <Forward />
                                    </i>
                                </div>
                            </div>
                        </div>
                        <audio id="playbar" controls></audio>
                    </div>
                </div>
                <PlayList />
            </div>
        </div>
    );
};

export default Player;
