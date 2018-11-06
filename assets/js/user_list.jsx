import React from 'react';
import _ from 'lodash';

 export default function UserList(props) {
   let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
   return <div className="row">
     <div className="col-12">
       <table className="table table-striped">
         <thead>
           <tr>
             <th>Email</th>
             <th>First Name</th>
             <th>Last Name</th>
           </tr>
         </thead>
         <tbody>
           {rows}
         </tbody>
       </table>
     </div>
   </div>;
}
 function User(props) {
   let {user} = props;
   return <tr>
     <td>{user.email}</td>
     <td>{user.first_name}</td>
     <td>{user.last_name}</td>
   </tr>;
}
