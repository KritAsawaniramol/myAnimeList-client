import React, { useEffect, useState } from 'react'
import {
    Box,
    Container,
    CssBaseline,
    Typography,
    ThemeProvider,
    CircularProgress,
    Card,
    TextField,
    Avatar,
    IconButton,
    FormControl,
    InputLabel,
    Button,
    InputAdornment,

} from '@mui/material';

import { useThemeContext } from './theme/ThemeContextProvider';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { getIsUserLoggedIn } from './auth/authClientStore';
import { sendProtectedReq } from './api/useApi';

export default function CommentBox(props) {
    const CHARACTER_LIMIT = 3000;
    const [openReply, setOpenReply] = useState(false)
    const [reply, setReply] = useState("")
    const { mal_id ,comment, fetchCommentFunc } = props
    const { theme } = useThemeContext();
    const [isLoggedIn, setIsLoggedIn] = useState(getIsUserLoggedIn());

    const replyComment = async (parentID) => {
        sendProtectedReq.post("/comment",
            {
                mal_id: `${mal_id}`,
                content: reply,
                parent_id: parentID,
            },
            { withCredentials: true }
        ).then((res) => {
            if (res.status !== 200) {
                alert(res.data.message)
            } else {
                setReply("")
            }
        }).catch((err) => alert(err)).finally(fetchCommentFunc)
    }

    const toggleReply = () => {
        setOpenReply(!openReply)
    }
    
    const handleReplyOnChange = (e) => {
        setReply(e.target.value)
    }
    
    const cancelReply = () => {
        setReply("")
        setOpenReply(false)
    }


    function timeDifference(current, previous) {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }

        else if (elapsed < msPerMonth) {
            return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
        }

        else if (elapsed < msPerYear) {
            return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
        }

        else {
            return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
        }
    }

    return (
        <Box my={2}>
            <Box display={'flex'} alignItems={'center'}>
                <Avatar
                    sx={{ mr: 1, bgcolor: theme.palette.primary.main }}
                    alt={comment.name}
                    src={comment.avatar_url}
                />
                <Typography mr={2} fontWeight={'bold'} variant='body1'>{comment.name}</Typography>
                <Typography variant='caption'>{timeDifference(Date.now(), new Date(comment.timestamp))}</Typography>
            </Box>
            <Box ml={6}>
                <Typography variant='body1' fontWeight={'light'}
                
                sx={{
                    overflowWrap: 'break-word'
                }}
                > {comment.content}</Typography>
                <Button disabled={!isLoggedIn} variant="text" sx={{ px: '15px', borderRadius: '20px' }} onClick={toggleReply} startIcon={<ChatBubbleOutlineIcon />}>Reply</Button>
                {
                    openReply &&
                    <Box borderRadius={2} sx={{ alignItems: 'center', border: '2px solid', borderColor: theme.palette.grey[300], padding: '1%' }}  >
                        <textarea
                            maxLength={CHARACTER_LIMIT}
                            value={reply}
                            onChange={handleReplyOnChange}
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
                            <Typography mr={2} variant='caption' fontWeight={'bold'} color={theme.palette.grey[500]}>{`${reply.length}/${CHARACTER_LIMIT}`}</Typography>
                            <Button variant="contained" color="secondaly" onClick={cancelReply} disableElevation>Cancel</Button>
                            <Button 
                            sx={{ ml: '5px' }} 
                            variant="contained" 
                            disableElevation
                            onClick={() => replyComment(comment.id)}
                            >Comment</Button>
                        </Box>
                    </Box>
                }
            </Box>
            {comment.replies.map((r, i) => {
                return (
                    <Box ml={6} mt={2} key={i}>
                        <Box display={'flex'} alignItems={'center'}>
                            <Avatar
                                sx={{ mr: 1, bgcolor: theme.palette.primary.main }}
                                alt={r.name}
                                src={r.avatar_url}
                            />
                            <Typography mr={2} fontWeight={'bold'} variant='body1'>{r.name}</Typography>
                            <Typography variant='caption'>{timeDifference(Date.now(), new Date(r.timestamp))}</Typography>
                        </Box>
                        <Typography 
                        ml={6} 
                        variant='body1' 
                        fontWeight={'light'}
                        sx={{
                            overflowWrap: 'break-word'
                        }}
                        >
                            {r.content}
                            </Typography>
                    </Box>
                )
            })}
        </Box>
    )
}
