import Head from "next/head";
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Loading from "@/components/Loading";
import { useState, useEffect } from 'react';
import LoginLayout from "@/components/LoginLayout";
import {IoHome} from "react-icons/io5";


export default function Home() {

  ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  //use this on top for render error
  const [blogData, setBlogData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [photoData, setPhotoData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);

  //define option within the component
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title:{
        display: true,
        text: 'Blogs Created Monthly by Year',
      }
    }
  }

  useEffect(() => {
    //fetch data from api
    const fetchData = async () =>{
      try{
        const response = await fetch('/api/blogs');
        const responseproject = await fetch('/api/projects');
        const responseShop = await fetch('/api/shops');
        const responseGallery = await fetch('/api/photos');

        const data = await response.json();
        const dataProject = await responseproject.json();
        const dataShop = await responseShop.json();
        const dataPhotos = await responseGallery.json();

        setBlogData(data);
        setProjectData(dataProject);
        setPhotoData(dataPhotos);
        setShopData(dataShop);
        setLoading(false);

      } catch (error){
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  //aggregate data per year and month
  const monthlyData = blogData.filter(dat => dat.status === "publish").reduce((acc, blog) => {
    const year = new Date(blog.createdAt).getFullYear();
    const month = new Date(blog.createdAt).getMonth();
    acc[year] = acc[year] || Array(12).fill(0);
    acc[year][month] ++;
    return acc;
  }, {})

  const currentYear = new Date().getFullYear();
  const years = Object.keys(monthlyData);
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const datasets = years.map(year =>({
    label: `$(year)`,
    data: monthlyData[year] || Array(12).fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`

  }));
  const data = {
    labels,
    datasets,
  }

  return (
     <LoginLayout>
      <>

         {/* {loading ?  <div className="po-fixed-center"><Loading/></div> : <div className="dashboard"></div>} */}
           
              
        <Head>
          <title>Portfolio Backend</title>
          <meta name="description" content="Blog website backend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className="dashboard">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>Admin <span>Dashboard</span></h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
              <IoHome/> <span>/</span> <span>Dashboard</span>
            </div>
          </div>
          {/* dashboard four cards */}
          <div className="topfourcards flex flex-sb">
            <div className="four_card">
              <h2>Total Blogs</h2>
              <span>{blogData.filter(dat => dat.status === 'publish').length}</span>
            </div>
            <div className="four_card">
              <h2>Total Projects</h2>
              <span>{projectData.filter(dat => dat.status === 'publish').length}</span>
            </div>
            <div className="four_card">
              <h2>Total Products</h2>
              <span>{shopData.filter(dat => dat.status === 'publish').length}</span>
            </div>
            <div className="four_card">
              <h2>Gallery Photos</h2>
              <span>{photoData.length}</span>
            </div>
          </div>
          {/* year overview */}
          <div className="year_overview flex flex_sb">
            <div className="leftyearoverview">
              <div className="flex flex-sb">
                <h3>Year Overview</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
                <h3 className="text-right">{blogData.filter(dat => dat.status === 'publish').length} / 365 <br /> <span>Total Published</span></h3>
              </div>
              <Bar data={data} options={options}/>
            </div>
            <div className="right_salescont">
              <div>
                <h3>Blogs By Category</h3>
                <ul className="creative-dots">
                  <li className="big-dot"></li>
                  <li className="semi-big-dot"></li>
                  <li className="medium-dot"></li>
                  <li className="semi-medium-dot"></li>
                  <li className="semi-small-dot"></li>
                  <li className="small-dot"></li>
                </ul>
              </div>
              <div className="blogscategory flex flex-center">
                <table>
                  <thead>
                    <td>Topics</td>
                    <td>Data</td>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Next Js</td>
                      <td>{blogData.filter(dat => dat.blogcategory[0] === "Next js").length}</td>
                    </tr>
                    <tr>
                      <td>Css</td>
                      <td>{blogData.filter(dat => dat.blogcategory[0] === "Css").length}</td>
                    </tr>
                    <tr>
                      <td>Node Js</td>
                      <td>{blogData.filter(dat => dat.blogcategory[0] === "Node js").length}</td>
                    </tr>
                    <tr>
                      <td>Django</td>
                      <td>{blogData.filter(dat => dat.blogcategory[0] === "django").length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </>
     </LoginLayout>
  );
}

