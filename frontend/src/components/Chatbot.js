import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";

export default function Chatbot({user}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [step, setStep] = useState(1);
  const [quotationStep, setQuotationStep] = useState(0);

  const navigate = useNavigate(); // React Router navigation

  const handleUserResponse = (text) => {
    let botResponse = "";
    let nextStep = step;

    if (quotationStep > 0) {
      handleQuotationProcess();
      return;
    }

    if (step === 1) {
      switch (text) {
        case "Get a Quotation":
          botResponse = "Let's get your quotation! Step 1: Choose a product/service.";
          setQuotationStep(1);
          break;

        case "Inquire":
          navigate('/inquiry', { state: { email: user.email }})
          setOpen(false);
          return;

        case "Promos/Discounts":
          navigate('/promos', { state: { email: user.email }})
          setOpen(false);
          return;

        case "Services Offered":
          navigate('/services', { state: { email: user.email }})
          setOpen(false);
          return;

        default:
          botResponse = "I didn't understand that.";
      }
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text, sender: "user" },
      { text: botResponse, sender: "bot" }
    ]);
    setStep(nextStep);
  };

  const handleQuotationProcess = () => {
    let botResponse = "";
    let nextStep = quotationStep;

    switch (quotationStep) {
      case 1:
        botResponse = "Step 2: Provide quantity needed.";
        nextStep = 2;
        break;

      case 2:
        botResponse = "Step 3: Enter delivery location.";
        nextStep = 3;
        break;

      case 3:
        botResponse = "Step 4: Submit your contact details.";
        nextStep = 4;
        break;

      case 4:
        botResponse = "Thank you! We will send you a quotation soon.";
        nextStep = 0;
        setStep(1); 
        break;

      default:
        botResponse = "Invalid step.";
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: "Next", sender: "user" },
      { text: botResponse, sender: "bot" }
    ]);
    setQuotationStep(nextStep);
  };

  return (
    <div>
      {/* Floating Button */}
      <MDBBtn 
        onClick={() => setOpen(!open)} 
        floating 
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "rgb(255, 165, 0)",
          border: "none",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      >
        <i class="fa-solid fa-headphones-simple"></i>
      </MDBBtn>
      
      {/* Chatbot Card */}
      {open && (
        <MDBCard style={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          width: "300px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px"
        }}>
          <MDBCardBody>
            <div className="d-flex justify-content-between align-items-center">
              <strong style={{ fontSize: "14px" }}>TravelWheels Chatbot</strong>
              <MDBBtn size="sm" color="danger" onClick={() => setOpen(false)}>
                ✖
              </MDBBtn>
            </div>
            <div className="mt-3" style={{ maxHeight: "250px", overflowY: "auto" }}>
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`d-flex ${msg.sender === "bot" ? "justify-content-start" : "justify-content-end"}`}
                >
                  <p 
                    style={{
                      backgroundColor: msg.sender === "bot" ? "#f1f1f1" : "#007bff",
                      color: msg.sender === "bot" ? "black" : "white",
                      padding: "6px 10px",
                      borderRadius: "10px",
                      maxWidth: "70%",
                      wordWrap: "break-word",
                      fontSize: "12px"
                    }}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="d-flex gap-2 flex-wrap mt-2">
              {quotationStep === 0 && step === 1 ? (
                <>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Get a Quotation")}>Get a Quotation</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Inquire")}>Inquire</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Promos/Discounts")}>Promos/Discounts</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Services Offered")}>Services Offered</MDBBtn>
                </>
              ) : quotationStep > 0 ? (
                <>
                  <MDBBtn size="sm" color="secondary" style={{ fontSize: "12px" }} onClick={handleQuotationProcess}>Next</MDBBtn>
                </>
              ) : (
                <>
                  <MDBBtn size="sm" color="secondary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("1")}>1</MDBBtn>
                  <MDBBtn size="sm" color="secondary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("2")}>2</MDBBtn>
                  <MDBBtn size="sm" color="secondary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("3")}>3</MDBBtn>
                </>
              )}
            </div>
          </MDBCardBody>
        </MDBCard>
      )}
    </div>
  );
}
