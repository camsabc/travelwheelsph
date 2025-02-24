import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBTypography, MDBContainer, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Toast from './Toast';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard() {
  const buttonColor = 'rgb(255, 165, 0)';
  const [toast, setToast] = useState(null);
  const [feedbackCountDetail, setFeedbackCountDetail] = useState(null);
  const [allFeedbacks, setAllFeedbacks] = useState(null);
  const [loadingCount, setLoadingCount] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const reportRef = useRef();

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  // Fetch aggregated feedback count data (for pie chart)
  useEffect(() => {
    fetch(`https://travelwheelsph.onrender.com/api/feedbacks/get-feedback-count-by-service`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          showToast(data.error, 'error');
        } else {
          setFeedbackCountDetail(data);
        }
        setLoadingCount(false);
      })
      .catch(err => {
        console.error('Error fetching feedback counts:', err);
        setError('Failed to fetch feedback count data.');
        showToast('Failed to fetch feedback count data.', 'error');
        setLoadingCount(false);
      });
  }, []);

  // Fetch all feedback documents (for bar chart and details)
  useEffect(() => {
    fetch(`https://travelwheelsph.onrender.com/api/feedbacks/get-all-feedbacks`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          showToast(data.error, 'error');
        } else {
          setAllFeedbacks(data);
        }
        setLoadingAll(false);
      })
      .catch(err => {
        console.error('Error fetching all feedbacks:', err);
        setError('Failed to fetch feedback data.');
        showToast('Failed to fetch feedback data.', 'error');
        setLoadingAll(false);
      });
  }, []);

  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const margin = 5; 
  
    const canvas = await html2canvas(reportRef.current, {
      scale: 2, 
      backgroundColor: '#ffffff', 
      useCORS: true, 
    });
  
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210 - 2 * margin; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
    pdf.save('report.pdf');
  };
  

  // Services list (labels)
  const services = [
    'Car Rental',
    'Transfer',
    'Hotel Booking',
    'Passport Appointment',
    'Flights',
    'Hotel Reservation',
    'MICE',
    'Travel Insurance',
    'Tour Packages - Domestic',
    'Educational Tour',
    'Tour Packages - International'
  ];

  // Prepare Pie Chart Data from aggregated counts
  const pieChartData = feedbackCountDetail
    ? {
        labels: services,
        datasets: [
          {
            label: 'Feedback Count',
            data: services.map(
              service =>
                feedbackCountDetail.find(item => item.service === service)?.count || 0
            ),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(199, 199, 199, 0.6)',
              'rgba(60, 179, 113, 0.6)',
              'rgba(238, 130, 238, 0.6)',
              'rgba(123, 104, 238, 0.6)',
              'rgba(255, 140, 0, 0.6)'
            ],
            borderWidth: 1,
          },
        ],
      }
    : null;

  // Calculate average ratings per service for each rating type
  const calculateAverageRatings = () => {
    if (!allFeedbacks || allFeedbacks.length === 0)
      return {
        booking: [],
        customer: [],
        pricing: [],
        overall: []
      };

    const bookingAverages = [];
    const customerAverages = [];
    const pricingAverages = [];
    const overallAverages = [];

    services.forEach(service => {
      const feedbacksForService = allFeedbacks.filter(
        feedback => feedback.service === service
      );

      if (feedbacksForService.length > 0) {
        const bookingSum = feedbacksForService.reduce(
          (acc, feedback) => acc + (feedback.rateBookingExperience || 0),
          0
        );
        const customerSum = feedbacksForService.reduce(
          (acc, feedback) => acc + (feedback.rateCustomerService || 0),
          0
        );
        const pricingSum = feedbacksForService.reduce(
          (acc, feedback) => acc + (feedback.ratePricing || 0),
          0
        );
        const overallSum = feedbacksForService.reduce(
          (acc, feedback) => acc + (feedback.rateOverallExperience || 0),
          0
        );
        bookingAverages.push((bookingSum / feedbacksForService.length).toFixed(2));
        customerAverages.push((customerSum / feedbacksForService.length).toFixed(2));
        pricingAverages.push((pricingSum / feedbacksForService.length).toFixed(2));
        overallAverages.push((overallSum / feedbacksForService.length).toFixed(2));
      } else {
        bookingAverages.push(0);
        customerAverages.push(0);
        pricingAverages.push(0);
        overallAverages.push(0);
      }
    });

    return {
      booking: bookingAverages,
      customer: customerAverages,
      pricing: pricingAverages,
      overall: overallAverages,
    };
  };

  const averageRatings = calculateAverageRatings();

  // Prepare Bar Chart Data for average ratings per rating type per service
  const barChartData = {
    labels: services,
    datasets: [
      {
        label: 'Booking Experience',
        data: averageRatings.booking,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Customer Service',
        data: averageRatings.customer,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Pricing',
        data: averageRatings.pricing,
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Overall Experience',
        data: averageRatings.overall,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Helper function to render stars given a rating (assuming max of 5)
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<MDBIcon key={`full-${i}`} fas icon="star" style={{ color: '#FFD700' }} />);
    }
    // Render half star if needed
    if (halfStar) {
      stars.push(<MDBIcon key="half" fas icon="star-half-alt" style={{ color: '#FFD700' }} />);
    }
    // Render empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<MDBIcon key={`empty-${i}`} far icon="star" style={{ color: '#FFD700' }} />);
    }
    return stars;
  };

  return (
    <MDBContainer fluid style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <MDBTypography
        tag="h2"
        style={{
          fontWeight: 'bold',
          color: buttonColor,
          marginBottom: '10px',
          textAlign: 'center',
          fontSize: '3rem',
        }}
      >
        DASHBOARD
      </MDBTypography>

      <div ref={reportRef}>
      <MDBRow className="justify-content-center align-items-center">
        {/* Left Card with Pie Chart */}
        <MDBCol md="5">
          <MDBCard>
            <MDBCardBody style={{ height: '450px' }}>
              <MDBCardTitle>Feedback Count per Services</MDBCardTitle>
              {loadingCount ? (
                <MDBTypography tag="p">Loading feedback count data...</MDBTypography>
              ) : error ? (
                <MDBTypography tag="p" style={{ color: 'red' }}>
                  {error}
                </MDBTypography>
              ) : feedbackCountDetail && pieChartData ? (
                <div style={{ height: '100%', marginTop: '20px' }}>
                  <Pie data={pieChartData} />
                </div>
              ) : (
                <MDBTypography tag="p">No feedback count data available.</MDBTypography>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        {/* Right Card with Bar Chart for Average Ratings */}
        <MDBCol md="7">
          <MDBCard>
            <MDBCardBody style={{ height: '450px' }}>
              <MDBCardTitle>Average Ratings per Service</MDBCardTitle>
              {loadingAll ? (
                <MDBTypography tag="p">Loading average rating data...</MDBTypography>
              ) : error ? (
                <MDBTypography tag="p" style={{ color: 'red' }}>
                  {error}
                </MDBTypography>
              ) : allFeedbacks ? (
                <div style={{ height: '95%' }}>
                  <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
                </div>
              ) : (
                <MDBTypography tag="p">No feedback data available.</MDBTypography>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      
{/* New Card for Feedback Details (Comment Section) */}
<MDBRow className="justify-content-center align-items-center mt-4">
  <MDBCol md="12">
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle className='mb-3'>Feedback Details</MDBCardTitle>
        {loadingAll ? (
          <MDBTypography tag="p">Loading feedback details...</MDBTypography>
        ) : error ? (
          <MDBTypography tag="p" style={{ color: 'red' }}>
            {error}
          </MDBTypography>
        ) : allFeedbacks && allFeedbacks.length > 0 ? (
          <MDBListGroup>
            {allFeedbacks.map((feedback, index) => (
              <MDBListGroupItem key={index}>
                <MDBRow>
                  {/* Left Column: Ratings */}
                  <MDBCol md="5">
                    <MDBTypography tag="h6">
                      <strong>NAME:</strong> {feedback.name || 'Anonymous'} 
                    </MDBTypography>
                    <MDBTypography tag="h6" style={{marginBottom: '10px'}}>
                      <strong>SERVICE:</strong>  {feedback.service}
                    </MDBTypography>

                    <MDBTypography tag="div">
                      Booking Experience: {renderStars(feedback.rateBookingExperience || 0)}
                    </MDBTypography>
                    <MDBTypography tag="div">
                      Customer Service: {renderStars(feedback.rateCustomerService || 0)}
                    </MDBTypography>
                    <MDBTypography tag="div">
                      Pricing: {renderStars(feedback.ratePricing || 0)}
                    </MDBTypography>
                    <MDBTypography tag="div">
                      Overall Experience: {renderStars(feedback.rateOverallExperience || 0)}
                    </MDBTypography>
                  </MDBCol>

                  {/* Right Column: Remarks & Recommendations */}
                  <MDBCol md="7">
                    <MDBTypography tag="p" style={{paddingTop: '50px'}}>
                      What they liked: {feedback.remarkLike ? feedback.remarkLike : 'N/A'}
                    </MDBTypography>
                    <MDBTypography tag="p">
                      What to improve: {feedback.remarkImprove ? feedback.remarkImprove : 'N/A'}
                    </MDBTypography>
                    <MDBTypography tag="p">
                      Recommendation: {feedback.reco ? feedback.reco : 'N/A'}
                    </MDBTypography>
                  </MDBCol>

                </MDBRow>
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
        ) : (
          <MDBTypography tag="p">No feedback details available.</MDBTypography>
        )}
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
</MDBRow>

</div>

<MDBRow className="mt-4">
        <MDBCol className="text-center">
          <MDBBtn color="warning" onClick={generatePDF}>Generate Report</MDBBtn>
        </MDBCol>
      </MDBRow>


      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </MDBContainer>
  );
}

export default Dashboard;
