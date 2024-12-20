import React from 'react';
import {
    Form,
    Input,
    Button,
    Comment
} from 'antd';

import { connect } from 'react-redux'
import { actions } from '../../../redux/module/panel'

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value, toUser }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} id="messageArea" />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" disabled={toUser === ''} style={{ backgroundColor: 'green' }}>
                Send
            </Button>
        </Form.Item>
    </>
);


class ChatEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submitting: false,
            value: '',
        }
    }

    componentDidMount() {
        this.bindParse();
    }

    /**
     * Analyze the file of the shear plate
     */
    bindParse = () => {
        document.getElementById("messageArea").addEventListener("paste", (e) => {
            var data = e.clipboardData
            if (!data.items) {
                return;
            }
            var items = data.items

            if (null == items || items.length <= 0) {
                return;
            }

            let item = items[0]
            if (item.kind !== 'file') {
                return;
            }
            let blob = item.getAsFile()

            let reader = new FileReader()
            reader.readAsArrayBuffer(blob)

            reader.onload = ((e) => {
                let imgData = e.target.result

                // Upload files must convert ArrayBuffer to UINT8ARAY
                let data = {
                    content: this.state.value,
                    contentType: 3,
                    file: new Uint8Array(imgData)
                }
                this.props.sendMessage(data)

                this.props.appendImgToPanel(imgData)
            })

        }, false)
    }
    /**
     * After each input box input, store the value in the state
     * @param {事件} e 
     */
    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    /**
     * Send message
     * @returns 
     */
    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }
        
        let message = {
            content: this.state.value,
            contentType: 1,
        }

        this.props.sendMessage(message)

        this.props.appendMessage(this.state.value);
        this.setState({
            submitting: false,
            value: '',
        });

    };

    render() {
        const { submitting, value } = this.state;
        const { toUser } = this.props.chooseUser;
        return (
            <>

                <Comment
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                            toUser={toUser}
                        />
                    }
                />
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
        chooseUser: state.panelReducer.chooseUser,
        messageList: state.panelReducer.messageList,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUser: (data) => dispatch(actions.setUser(data)),
    }
}

ChatEdit = connect(mapStateToProps, mapDispatchToProps)(ChatEdit)

export default ChatEdit