import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Success from "./components/success";
import Addhospital from "./components/admin/addhospital";
import Dashboard from "./components/admin/Dashboard/Dashboard";
import UserHome from "./components/user/userhome";
import UserDash from "./components/admin/Dashboard/userdash";
import Appointment from "./components/user/appointment";
import EditHospital from "./components/admin/edithospital";
import ViewAppointment from "./components/user/viewappointment";
import HospitalHome from "./components/hospital/hospitalHome";
import ViewNewAppointments from "./components/hospital/manageappointment";
import Vaccine from "./components/user/book_vaccine";
import HospitalLogin from "./components/hospital/hospitallogin";
import ComplaintForm from "./components/user/file_complaint";
import ViewComplaints from "./components/admin/Main/complaintView";
import AddProducts from "./components/admin/Main/addproducts";
import ComplaintStatus from "./components/user/viewComplaintStatus";
import ViewProfile from "./components/user/userprofile";
import ViewProducts from "./components/user/marketplace/viewproducts";
import Viewcart from "./components/user/marketplace/cart";
import Email from "./components/forgot_password/email";
import Otpverify from "./components/forgot_password/otpverify";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Login} />
          <Route path="/userhome" component={UserHome} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/success" component={Success} />
          <Route path="/userdash" component={UserDash} />
          <Route path="/addhospital" component={Addhospital} />
          <Route path="/edithospital" component={EditHospital} />
          <Route path="/appointment" component={Appointment} />
          <Route path="/viewappointment" component={ViewAppointment} />
          <Route path="/hospitalhome" component={HospitalHome} />
          <Route path="/viewnewappointment" component={ViewNewAppointments} />
          <Route path="/bookvaccine" component={Vaccine} />
          <Route path="/hospitallogin" component={HospitalLogin} />
          <Route path="/complaintform" component={ComplaintForm} />
          <Route path="/complaintbox" component={ViewComplaints} />
          <Route path="/complaintstatus" component={ComplaintStatus} />
          <Route path="/addproducts" component={AddProducts} />
          <Route path="/cart" component={Viewcart} />
          <Route path="/viewprofile" component={ViewProfile} />
          <Route path="/viewproducts" component={ViewProducts} />
          <Route path="/emailverification" component={Email} />
          <Route path="/otpverify" component={Otpverify} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
