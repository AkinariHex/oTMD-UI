import React from 'react'
import Downshift from 'downshift'
import { useState } from 'react'
import { Notification, Setting } from 'iconsax-react';
import Timestamp from 'react-timestamp';
import { ExternalLink } from 'react-external-link';

const NotificationsBTN = ({ session ,notifications }) => {

    const [notificationsArray, setNotificationsArray] = useState(notifications)

    async function acceptSysNotifications(id){

        setTimeout(async () => {
            let res = await fetch(`/api/notifications/seen?nid=${id}`)
            res = await res.json();

            if(res.status === 'success') {
                setNotificationsArray(notificationsArray.filter(item => item.record_id !== id))
            } 

        } , 12000)

        return
        
    }

    return (
        <Downshift>
                {
                    ({ getToggleButtonProps, isOpen }) => (
                    <div className='notificationsContainer'>
                        <button {...getToggleButtonProps()} aria-label={'toggle menu'} className='notificationsButton'>
                            <Notification size="20" color="#d9e3f0"/>
                            {
                                (notificationsArray.length !== 0) && <span id="notificationsNumber">{notificationsArray.length}</span>
                            }
                        </button>
                        
                        {isOpen &&
                            <ul className='notificationsList'>
                                {
                                    notificationsArray.length === 0 && 
                                    <li className="notification">
                                        <div className="noContent">No new notifications!</div>
                                    </li>
                                }
                                {
                                    notificationsArray.map((notification, index) => {      

                                        // SYSTEM NOTIFICATIONS
                                        if(notification.type === 0){
                                            acceptSysNotifications(notification.record_id);
                                            return(
                                                <li className={`notification type${notification.type}`} key={index}>
                                                    <div className="image">
                                                        <Setting style={{padding: "0 2px"}} size="36" color="#555555" variant="Bulk"/>
                                                    </div>
                                                    <div className="content">
                                                        <div className="text">
                                                            <div>{notification.content.text}</div>
                                                        </div>
                                                        <div className="timestamp"><Timestamp date={notification.timestamp}/></div>
                                                    </div>
                                                </li>
                                            )
                                        }

                                        // FRIEND NOTIFICATIONS
                                        if(notification.type === 1){

                                            
                                            async function refuse(nid) {
                                                let res = await fetch(`/api/notifications/refuse?nid=${nid}`)
                                                res = await res.json();

                                                if(res.status === 'success') {
                                                    setNotificationsArray(notificationsArray.filter(item => item.record_id !== nid))
                                                }
                                            }

                                            return(
                                                <li className={`notification type${notification.type}`} key={index}>
                                                    <div className="image">
                                                        <img src={`http://s.ppy.sh/a/${notification.sender.userid}`} alt="sender image" className='senderPropic'/>
                                                    </div>
                                                    <div className="content">
                                                        <div className="text">
                                                            <div><ExternalLink href={`https://osu.ppy.sh/users/${notification.sender.userid}`}>{notification.sender.username}</ExternalLink> has requested to be your friend!</div>
                                                        </div>
                                                        <div className="timestamp"><Timestamp date={notification.timestamp}/></div>
                                                    </div>
                                                    <div className="buttons">
                                                        <button className="accept" onClick={() => accept(notification.record_id, notification.team.id)}><i className='bx bx-check'></i></button>
                                                        <button className="refuse" onClick={() => refuse(notification.record_id)}><i className='bx bx-x'></i></button>
                                                    </div>
                                                </li>
                                            )
                                        }

                                        // tEAM NOTIFICATIONS
                                        if(notification.type === 2) {

                                            async function accept(nid, tid) {

                                                let body = await {
                                                    "notification_id": nid,
                                                    "team_id": tid,
                                                    "user_id": session.id,
                                                    "username": session.username
                                                }

                                                let res = await fetch(`/api/notifications/accept`, {method: 'POST', body: JSON.stringify(body), contentType: 'application/json'})
                                                res = await res.json();

                                                if(res.status === 'success') {
                                                    setNotificationsArray(notificationsArray.filter(item => item.record_id !== nid))
                                                }
                                            }

                                            
                                            async function refuse(nid) {
                                                let res = await fetch(`/api/notifications/refuse?nid=${nid}`)
                                                res = await res.json();

                                                if(res.status === 'success') {
                                                    setNotificationsArray(notificationsArray.filter(item => item.record_id !== nid))
                                                }
                                            }

                                            return(
                                                <li className={`notification type${notification.type}`} key={index}>
                                                    <div className="image">
                                                        <img src={`http://s.ppy.sh/a/${notification.sender.userid}`} alt="sender image" className='senderPropic'/>
                                                    </div>
                                                    <div className="content">
                                                        <div className="text">
                                                            <div><ExternalLink href={`https://osu.ppy.sh/users/${notification.sender.userid}`}>{notification.sender.username}</ExternalLink> invited you to <span>{notification.content.team.name}</span> team!</div>
                                                        </div>
                                                        <div className="timestamp"><Timestamp date={notification.timestamp}/></div>
                                                    </div>
                                                    <div className="buttons">
                                                        <button className="accept" onClick={() => accept(notification.record_id, notification.content.team.id)}><i className='bx bx-check'></i></button>
                                                        <button className="refuse" onClick={() => refuse(notification.record_id)}><i className='bx bx-x'></i></button>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        }
                    </div>
                    )
                }
        </Downshift>
    )
}

export default NotificationsBTN
