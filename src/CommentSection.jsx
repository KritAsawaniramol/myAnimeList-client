import React, { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Button,
} from '@mui/material';
import { useThemeContext } from './theme/ThemeContextProvider';
import CommentBox from './CommentBox';
import { getIsUserLoggedIn } from './auth/authClientStore';
import { sendProtectedReq } from './api/useApi';
import { sendUnprotectedReq } from './api/useApi';


export default function CommentSection(props) {
    const { mal_id } = props
    const { theme } = useThemeContext();
    const CHARACTER_LIMIT = 3000;
    const [isLoggedIn, setIsLoggedIn] = useState(getIsUserLoggedIn());
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [openReply, setOpenReply] = useState(false)
    const handleCommentOnChange = (e) => {
        console.log(e.target.value)
        setNewComment(e.target.value)
    }

    const fetchComment = async () => {
        setIsLoading(true)
        sendUnprotectedReq.get(`/comment?mal_id=${mal_id}`).
            then((res) => {
                console.log(res.status);
                console.log(res.data);
                if (res.status == 200) {
                    setComments(res.data.comments ? res.data.comments : [])
                } else {
                    console.log(res.status);
                    console.log(res.data.message);
                }
                setIsLoading(false)
            }).catch((err) => console.log(err)).finally(() => setIsLoading(false))
    }

    const postComment = async () => {
        sendProtectedReq.post("/comment",
            {
                mal_id: `${mal_id}`,
                content: newComment,
                parent_id: 0,
            },
        ).then((res) => {
            if (res.status !== 200) {
                alert(res.data.message)
            } else {
                setNewComment("")
            }
        }).catch((err) => alert(err)).finally(fetchComment)

    }

    useEffect(() => {
        fetchComment()
    }, [])


    return (
        <>
            <Box borderRadius={2} sx={{ alignItems: 'center', border: '2px solid', borderColor: theme.palette.grey[300], padding: '1%' }}  >
                <textarea
                    disabled={!isLoggedIn}
                    maxLength={CHARACTER_LIMIT}
                    value={newComment}
                    onChange={handleCommentOnChange}
                    rows={4}
                    placeholder='Comment'
                    style={{
                        maxWidth: '100%',
                        border: 0,
                        display: 'block',
                        width: '100%',
                        fontSize: '1.1667rem',
                        fontFamily: theme.typography.fontFamily,
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary
                    }}></textarea>
                <Box display={'flex'} justifyContent={'flex-end'} mt={1} alignItems={'flex-end'}>
                    <Typography mr={2} variant='caption' fontWeight={'bold'} color={theme.palette.grey[500]}>{`${newComment.length}/${CHARACTER_LIMIT}`}</Typography>
                    <Button variant="contained" disabled={!isLoggedIn} disableElevation onClick={postComment}>Comment</Button>
                </Box>

            </Box>
            {isLoading === true ? 
                <>Loading....</>

            : comments.map((c, i) => {
                    console.log(c)
                    return (
                        <CommentBox key={i} comment={c} mal_id={mal_id} fetchCommentFunc={fetchComment} />
                    )
                })
            
            }
            
        </>
    )
}
