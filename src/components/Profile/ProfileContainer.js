import React, {useEffect, useState} from 'react';
import {Card, Input, Button, Avatar} from 'antd';
import {EditOutlined, UserOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {editUser} from "../../_actions/user_action";
import styled from "styled-components";
import Api from "../../util/Api";
import {addFile, modifiedFile} from "../../_actions/repository_action";
import ImgUpload from "../Repository/ImgUpload";

const {Meta} = Card;

const {TextArea} = Input;

const ProfileContainer = (props) => {
    const [editData, setShowResults] = React.useState(false)
    const [userName, setUserName] = useState(props.user.userName)
    const [userDescription, setUserDescription] = useState(props.user.description)
    const [profile, setProfile] = useState(props.user.profile)
    const [isOwner, setIsOwner] = useState(false)


    const dispatch = useDispatch()
    const onClick = () => setShowResults(!editData)

    const fileList = useSelector(state => state.repository.fileList)
    const isModified = useSelector(state => state.repository.isModified)
    const userInfo = useSelector(state => state.userInfo)

    const onClickEdit = () => {
        const formData = new FormData
        if(isModified === true){
            if (fileList.length > 0) {
                if (fileList[0].originFileObj) {
                    formData.append('file', fileList[0].originFileObj);
                    Api.post('/files', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }).then(response => {
                        setProfile(response.data)
                        let dataToSubmit = {
                            userId: props.user.userId,
                            userName: userName,
                            description: userDescription,
                            profile: response.data
                        }
                        dispatch(editUser(dataToSubmit))
                            .then(response => console.log("Edit:", response))
                            .catch(error => error)
                    })
                } else {
                    console.log("img file error");
                }

                dispatch(modifiedFile(false));

            } else {
                setProfile(null);
                let dataToSubmit = {
                    userId: props.user.userId,
                    userName: userName,
                    description: userDescription,
                    profile: "profileDelete"
                }
                dispatch(editUser(dataToSubmit))
                    .then(response => console.log("NOEdit:", response))
                    .catch(error => error)
            }
        }else{
            let dataToSubmit = {
                userId: props.user.userId,
                userName: userName,
                description: userDescription,
            }
            dispatch(editUser(dataToSubmit))
                .then(response => console.log("NOEdit:", response))
                .catch(error => error)
        }
    }

    useEffect(() => {

        if (props.user.userId === userInfo.userId) {
            setIsOwner(true)
        }

        setUserName(userInfo.userName)
        setUserDescription(userInfo.description)
        setProfile(userInfo.profile)

        let newFileList = [];

        if(profile != null){
            newFileList = [{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: `${Api.defaults.baseURL}/files/${profile}`,
            }];
        }

        dispatch(addFile(newFileList));

        dispatch(modifiedFile(false));
    }, [])

    return (
        <Card
            style={{width: "100%"}}
            cover={
                editData ?
                    <span id="create-map-upload" style={{marginLeft: '25px', marginTop: '25px', width: "100%"}}>
                        <ImgUpload/>
                    </span> :

                    <div>
                        <Avatar size={250}
                                shape="square"
                                src={profile ? Api.defaults.baseURL + '/files/' + profile : 'NoProfile.png'}
                        />
                    </div>
            }
            actions={[
                <>
                    {
                        isOwner &&
                        <span title='????????? ??????' onClick={onClick}>{
                            editData ?
                                <div><Button danger style={{marginRight: '10px'}}>????????????</Button><Button
                                    type="primary"
                                    onClick={onClickEdit}>??????
                                    ??????</Button></div>
                                : <div><EditOutlined key="edit"/>edit profile</div>
                        }</span>
                    }
                </>,
            ]}
        >
            {editData ?
                <div>
                    <Meta
                        description="????????? ?????????????????? ???????????????!"
                    />
                    <div style={{marginTop: '10px'}}>??????</div>
                    <Input
                        placeholder="?????? ????????? ????????? ?????????."
                        value={userName}
                        onChange={(event) => {
                            setUserName(event.currentTarget.value)
                        }}
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                    />
                    <div style={{marginTop: '10px'}}>???????????????</div>
                    <TextArea
                        placeholder="?????????????????? ????????? ?????????."
                        rows={4}
                        value={userDescription}
                        onChange={(event) => {
                            setUserDescription(event.currentTarget.value)
                        }}
                    />
                </div>
                :
                <div>
                    <Meta
                        title={<h2>{userName}</h2>}
                        description={userInfo.userEmail}
                        style={{marginTop: '10px'}}
                    />
                    <Meta
                        style={{marginTop: "30px"}}
                        title={userDescription}
                    />
                </div>
            }
        </Card>
    );
};

export default ProfileContainer;