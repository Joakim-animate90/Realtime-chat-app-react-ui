import React from 'react';
import {
    Tooltip,
    Button,
    message
} from 'antd';

import {
    AudioOutlined,
} from '@ant-design/icons';

import Recorder from 'js-audio-recorder';
import { connect } from 'react-redux'
import { actions } from '../../../redux/module/panel'


class ChatAudio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }
    /**
     * Start recording audio
     */
    audiorecorder = null;
    hasAudioPermission = true;
    startAudio = () => {
        let media = {
            isRecord: true
        }
        this.props.setMedia(media);
        
        this.audiorecorder = new Recorder()
        this.hasAudioPermission = true;
        this.audiorecorder
            .start()
            .then(() => {
                console.log("start audio...")
            }, (_error) => {
                this.hasAudioPermission = false;
                message.error("Recording permissions failed!")
            })
    }

    /**
     * Stop recording audio
     */
    stopAudio = () => {
        let media = {
            isRecord: false
        }
        this.props.setMedia(media);
        
        if (!this.hasAudioPermission) {
            return;
        }
        let blob = this.audiorecorder.getWAVBlob();
        this.audiorecorder.stop()
        this.audiorecorder.destroy()
            .then(() => {
                this.audiorecorder = null;
            });
        this.audiorecorder = null;

        let reader = new FileReader()
        reader.readAsArrayBuffer(blob)

        reader.onload = ((e) => {
            let imgData = e.target.result

            // Upload files must convert ArrayBuffer to UINT8ARAY
            let data = {
                content: this.state.value,
                contentType: 3,
                fileSuffix: "wav",
                file: new Uint8Array(imgData)
            }
            this.props.sendMessage(data)
        })

        this.props.appendMessage(<audio src={window.URL.createObjectURL(blob)} controls autoPlay={false} preload="auto" />);
    }

    render() {
        const { chooseUser } = this.props;
        return (
            <>
                <Tooltip title="Sending voice">
                    <Button
                        shape="circle"
                        onMouseDown={this.startAudio}
                        onMouseUp={this.stopAudio}
                        onTouchStart={this.startAudio}
                        onTouchEnd={this.stopAudio}
                        style={{ marginRight: 10 }}
                        icon={<AudioOutlined />}
                        disabled={chooseUser.toUser === ''}
                    />
                </Tooltip>
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
        chooseUser: state.panelReducer.chooseUser,
        socket: state.panelReducer.socket,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setMedia: (data) => dispatch(actions.setMedia(data)),
    }
}

ChatAudio = connect(mapStateToProps, mapDispatchToProps)(ChatAudio)

export default ChatAudio