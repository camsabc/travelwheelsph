import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";

export default function Chatbot({ user }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [step, setStep] = useState(1);
  const [processStep, setProcessStep] = useState(0);
  const [currentProcess, setCurrentProcess] = useState("");

  const navigate = useNavigate();

  const processes = {
    "Can I change my email?": [
      "No, the email address you signed up with is permanent and can't be changed"
    ],
    "Can I change my number?": [
      "Yes, the number can be changed follow these intructions to change you phone number",
      "Step 1: Go to your profile",
      "Step 2: Click Edit Profile",
      "Step 3: Input your new phone number",
      "Step 4: Click Save",
      "Your new number should now be updated in your profile",
    ],
    "Can I change my name?": [
      "Yes, the name can be changed follow these intructions to change you phone number",
      "Step 1: Go to your profile",
      "Step 2: Click Edit Profile",
      "Step 3: Input your new name",
      "Step 4: Click Save",
      "Your new name should now be updated in your profile",
    ],
    "I want to change my password": [
      "Here's how you can change your password",
      "Step 1: Go to your profile",
      "Step 2: Click Edit Profile",
      "Step 3: Go to password section",
      "Step 4: Input your new password",
      "Step 5: Re-type your new password",
      "Step 6: Click Save",
      "Your new password should now be updated",
    ],
    "I forgot my password": [
      "To change your number if you are NOT logged in, please follow these steps:",
      "Step 1: Go to Sign in Page",
      "Step 2: Click the 'Forgot Password'",
      "Step 3: Input your email and wait for verifications code",
      "Step 4: Input the code sent via email",
      "Step 5: Click Submit button",
      "Step 6: Input your new password",
      "Step 7: Re-type your new password",
      "Step 8: Click the Reset button",
      "Your new password should now be updated",
    ]
  };

  const handleUserResponse = (text) => {
    if (processes[text]) {
      setCurrentProcess(text);
      setProcessStep(0);
      setStep(6);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text, sender: "user" },
        { text: processes[text][0], sender: "bot" }
      ]);
      return;
    }

    let botResponse = "";

    if (step === 1) {
      switch (text) {
        case "Get a Quotation":
          botResponse = "Go to service offered page and select a service to get quotation";
          break;

        case "Inquire":
          navigate('/inquiry', { state: { email: user.email } });
          setOpen(false);
          return;

        case "Promos/Discounts":
          navigate('/promos', { state: { email: user.email } });
          setOpen(false);
          return;

        case "Services Offered":
          navigate('/services', { state: { email: user.email } });
          setOpen(false);
          return;

        case "Others":
          botResponse = "Choose an option:";
          setStep(2);
          break;

        default:
          botResponse = "I didn't understand that.";
      }
    } else if (step === 2) {
      switch (text) {
        case "User Details":
          botResponse = "Select an option:";
          setStep(3);
          break;

        case "About Us":
          navigate('/about-us', { state: { email: user.email } });
          setOpen(false);
          return;

        case "Back":
          setStep(1);
          botResponse = "Returning to the main menu.";
          break;

        default:
          botResponse = "I didn't understand that.";
      }
    } else if (step === 3) {
      switch (text) {
        case "Accounts":
          botResponse = "Select an option:";
          setStep(4);
          break;

        case "Password":
          botResponse = "Select an option:";
          setStep(5);
          break;

        case "Back":
          setStep(2);
          botResponse = "Returning to 'Others' menu.";
          break;

        default:
          botResponse = "I didn't understand that.";
      }
    } else if (step === 4) {
      switch (text) {
        case "Back":
          setStep(3);
          botResponse = "Returning to 'User Details' menu.";
          break;

        default:
          botResponse = "I didn't understand that.";
      }
    } else if (step === 5) {
      switch (text) {
        case "Back":
          setStep(3);
          botResponse = "Returning to 'User Details' menu.";
          break;

        default:
          botResponse = "I didn't understand that.";
      }
    }

    if (botResponse) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text, sender: "user" },
        { text: botResponse, sender: "bot" }
      ]);
    }
  };

  const handleProcessSteps = (direction) => {
    let newStep = direction === "next" ? processStep + 1 : processStep - 1;

    if (newStep < 0) {
      setStep(3);
      return;
    }

    if (newStep >= processes[currentProcess].length) {
      setStep(3);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Next", sender: "user" },
        { text: "Process complete!", sender: "bot" }
      ]);
      return;
    }

    setProcessStep(newStep);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: direction === "next" ? "Next" : "Back", sender: "user" },
      { text: processes[currentProcess][newStep], sender: "bot" }
    ]);
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
        <i className="fa-solid fa-headphones-simple"></i>
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

            {/* Chatbot Buttons */}
            <div className="d-flex gap-2 flex-wrap mt-2">
              {step === 1 ? (
                <>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Get a Quotation")}>Get a Quotation</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Inquire")}>Inquire</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Promos/Discounts")}>Promos/Discounts</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Services Offered")}>Services Offered</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Others")}>Others</MDBBtn>
                </>
              ) : step === 2 ? (
                <>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("User Details")}>Accounts</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("About Us")}>About Us</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Back")}>Back</MDBBtn>
                </>
              )  : step === 3 ? (
                <>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Accounts")}>User Details</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Password")}>Password</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Back")}>Back</MDBBtn>
                </>
              ) : step === 4 ? (
                <>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Can I change my email?")}>Can I change my email?</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Can I change my number?")}>Can I change my number?</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Can I change my name?")}>Can I change my name?</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Back")}>Back</MDBBtn>
                </>
              ) : step === 5 ? (
                <>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("I want to change my password")}>Change Password</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("I forgot my password")}>Forgot Password</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleUserResponse("Back")}>Back</MDBBtn>
                </>
              ) : step === 6 ? (
                <>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleProcessSteps("back")}>Back</MDBBtn>
                  <MDBBtn size="sm" color="primary" style={{ fontSize: "12px" }} onClick={() => handleProcessSteps("next")}>Next</MDBBtn>
                </>
              ) : null}
            </div>
          </MDBCardBody>
        </MDBCard>
      )}
    </div>
  );
}
