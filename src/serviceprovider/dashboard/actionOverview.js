import React, { Fragment } from 'react'

const actionOverview = ({ data, status, title, team, showLastlogin, reqText, task, processRequest, props , unShowUnaddress}) => {
  const { count, dayCount, loginCount, dayUnaddress, loginUnaddress } = data;
    const handleRedirectApproval = (task, processRequest) => {
      props.history.push({
        pathname: '/actionAndTaskOverview',
        state: { task: task, processRequest: processRequest,assignedKey:'totalAssigned' }
      })
    }
    const handleRedirectLast24Hr = (task, processRequest) => {
      props.history.push({
        pathname: '/actionAndTaskOverview',
        state: { task: task, processRequest: processRequest, assignedKey:'last24HrsAssigned' }
      })
    }
    const handleRedirectLastLogin = (task, processRequest) => {
      props.history.push({
        pathname: '/actionAndTaskOverview',
        state: { task: task, processRequest: processRequest, assignedKey:'lastLoginAssigned' }
      })
    }
  
  return (
    <div className="card mh-ac m-b-15 dashboardUpdate">
      <div className="cursor-pointer" onClick={() => handleRedirectApproval(task, processRequest)}>
      <div className="leftBox">
        <h3 className="text-blue mb-0">{data.count} <small className="fs-12">{status}</small></h3>
        <div className="action-summ db-grey m-b-10">{title}<br />{reqText ? <span className="req-text">{reqText}</span> : ""}</div>
        </div>
        <div className="adminIcon">{!team ? <span class="icon-single-user fs-18"></span> : <span class="icon-team fs-18"></span>}</div>
      </div>

      <div className="flex m-b-5 cursor-pointer" onClick={() => handleRedirectLast24Hr(task, processRequest)}>
        <div className="flex-1">
          <div className="once-pt">{dayCount}</div>
          <span className="once-tm">in the last 24 Hrs</span>
        </div>
        <div className="flex-1 text-right">
          {!unShowUnaddress ? <span className="sm-badge">{`${dayUnaddress} Un-Addressed`} </span> : ""}
        </div>
      </div>

      <div className="flex cursor-pointer" onClick={() => handleRedirectLastLogin(task, processRequest)}>
        <div className="flex-1">
          <div className="once-pt fw-600">{showLastlogin ? loginCount : ""}</div>
          <span className="once-tm">{showLastlogin ? `Since last login` : ""}</span>
        </div>
        {/* <div className="flex-1">
          <span className="sm-badge">{`${loginUnaddress} Un-Addressed`} </span>
        </div> */}
      </div>

    </div>
  )
}


export default actionOverview

