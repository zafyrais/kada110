import {useState} from 'react'
import { Link, Outlet } from 'react-router-dom'
export default function Dashboard(){
    return (
        <>
            <div className='dashboard-cont'>
                <div className='sidebar'>
                  vdsassx
                </div>
                <div>
                    <Outlet/>
                </div>
            </div>
           
        
        </>
    )
}