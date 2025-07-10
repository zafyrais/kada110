import {useState} from 'react'
import { Link, Outlet } from 'react-router-dom'
export default function Dashboard(){
    return (
        <>
            <div className='dashboard-cont'>
                <div className='sidebar'>
                  <h1>Welcome to this website You can Create your own group study</h1>
                </div>
                <div>
                    <Outlet/>
                </div>
            </div>
           
        
        </>
    )
}