import React ,{useState,useEffect}from "react"; 
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const AdminDashboard = () => {
  const [chartData,setChartData] = useState([]);
  const [chartOrderData,setChartOrderData] = useState([]);
  const [auth] = useAuth();
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setChartData(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  

  const getAllOrders = async () => {
    try {
      const { orderdata } = await axios.get("/api/v1/auth/all-orders");
      setChartOrderData(orderdata);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllOrders();
  }, []);
  

  const gradientOffset = () => {
  const dataMax = Math.max(...chartData.map((i) => i.quantity));
  const dataMin = Math.min(...chartData.map((i) => i.quantity));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();



  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
             <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
            <h3>Want to see Today's Transaction Details <a href="https://sandbox.braintreegateway.com/" target="_blank">Click Here</a> </h3>
         
{chartOrderData && chartOrderData.length>0 &&(
    <ResponsiveContainer width="90%" height={200}>
    <AreaChart
    
      width={500}
      height={400}
      data={chartOrderData}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="status" />
      <YAxis dataKey="products"/>
      <Tooltip />
      <Area type="monotone" dataKey="products" stroke="#82ca9d" fill="#82ca9d" />
    </AreaChart>
  </ResponsiveContainer>

    )}
    <h1>Survey</h1>


{/* another */}
                       
{chartData && chartData.length>0 &&(
    <ResponsiveContainer width="90%" height={200}>
    <AreaChart
    
      width={500}
      height={400}
      data={chartData}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis dataKey="quantity"/>
      <Tooltip />
      <Area type="monotone" dataKey="quantity" stroke="#82ca9d" fill="#82ca9d" />
    </AreaChart>
  </ResponsiveContainer>

    )}

                        
{chartData && chartData.length>0 &&(
    <ResponsiveContainer width="90%" height={200}>
    <AreaChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="price"/>
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="price" stroke="#000" fill="url(#splitColor)" />
        </AreaChart>
  </ResponsiveContainer>

    )}
              <h3> Admin Name : {auth?.user?.name}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.phone}</h3>
           

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;