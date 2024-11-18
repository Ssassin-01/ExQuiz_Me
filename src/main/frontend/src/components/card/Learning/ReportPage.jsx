import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { AiOutlineWarning, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import axios from 'axios';

const ReportPage = () => {
    const { cardNumber } = useParams(); // URL에서 cardNumber 가져오기
    const navigate = useNavigate();
    const [reportReason, setReportReason] = useState('');
    const [reportDetails, setReportDetails] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleReportSubmit = async (e) => {
        e.preventDefault();

        if (!reportReason) {
            alert('신고 사유를 선택해주세요!');
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post(`${apiUrl}/api/report`, {
                cardNumber,
                reason: reportReason,
                details: reportDetails,
            });
            setShowSuccessMessage(true); // 성공 메시지 표시
            setTimeout(() => {
                navigate(`/learning/${cardNumber}`); // 2초 후 학습 페이지로 이동
            }, 2000);
        } catch (error) {
            console.error('신고 실패:', error);
            alert('신고에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="report-page-container" style={styles.container}>
            <Card style={styles.card}>
                <Card.Body>
                    <div style={styles.header}>
                        <AiOutlineWarning size={40} color="#ffcc00" />
                        <h2 style={styles.title}>신고하기</h2>
                    </div>
                    {showSuccessMessage && (
                        <Alert variant="success" style={styles.alert}>
                            <AiOutlineCheckCircle size={20} style={styles.icon} />
                            신고가 성공적으로 제출되었습니다!
                        </Alert>
                    )}
                    <Form onSubmit={handleReportSubmit}>
                        <Form.Group controlId="reportReason" style={styles.formGroup}>
                            <Form.Label>
                                <FaRegCommentDots style={styles.icon} /> 신고 사유
                            </Form.Label>
                            <Form.Control
                                as="select"
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                style={styles.input}
                                required
                            >
                                <option value="">사유 선택</option>
                                <option value="부적절한 단어">부적절한 단어</option>
                                <option value="기타">기타</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="reportDetails" style={styles.formGroup}>
                            <Form.Label>
                                <FaRegCommentDots style={styles.icon} /> 상세 설명
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={reportDetails}
                                onChange={(e) => setReportDetails(e.target.value)}
                                style={styles.textArea}
                                placeholder="신고에 대한 추가 설명을 입력하세요."
                            />
                        </Form.Group>
                        <div style={styles.buttonContainer}>
                            <Button
                                type="submit"
                                style={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? '제출 중...' : '신고하기'}
                            </Button>
                            <Button
                                variant="secondary"
                                style={styles.cancelButton}
                                onClick={() => navigate(`/learning/${cardNumber}`)}
                            >
                                취소
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ReportPage;

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        padding: '20px',
    },
    card: {
        width: '100%',
        maxWidth: '500px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    title: {
        marginLeft: '10px',
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    cardInfo: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#555',
    },
    alert: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },
    icon: {
        marginRight: '8px',
        verticalAlign: 'middle',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        borderRadius: '5px',
        border: '1px solid #ddd',
        padding: '10px',
    },
    textArea: {
        borderRadius: '5px',
        border: '1px solid #ddd',
        padding: '10px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    submitButton: {
        backgroundColor: '#ffcc00',
        color: '#333',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        color: '#333',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontWeight: 'bold',
    },
};


// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Form, Button, Card, Alert } from 'react-bootstrap';
// import axios from 'axios';
//
// const ReportPage = () => {
//     const { cardNumber } = useParams(); // URL에서 cardNumber 가져오기
//     const navigate = useNavigate();
//     const [reportReason, setReportReason] = useState('');
//     const [reportDetails, setReportDetails] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const apiUrl = process.env.REACT_APP_API_URL;
//
//     const handleReportSubmit = async (e) => {
//         e.preventDefault();
//
//         if (!reportReason) {
//             alert('신고 사유를 선택해주세요!');
//             return;
//         }
//
//         setIsSubmitting(true);
//         try {
//             await axios.post(`${apiUrl}/api/report`, {
//                 cardNumber,
//                 reason: reportReason,
//                 details: reportDetails,
//             });
//             alert('신고가 완료되었습니다.');
//             navigate(`/learning/${cardNumber}`); // 신고 완료 후 학습 페이지로 이동
//         } catch (error) {
//             console.error('신고 실패:', error);
//             alert('신고에 실패했습니다. 다시 시도해주세요.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//
//     return (
//         <div className="report-page-container">
//             <Card style={{ padding: '20px', maxWidth: '600px', margin: 'auto', marginTop: '50px' }}>
//                 <Card.Body>
//                     <h2>신고하기</h2>
//                     <p>신고하려는 카드 번호: <strong>{cardNumber}</strong></p>
//                     <Form onSubmit={handleReportSubmit}>
//                         <Form.Group controlId="reportReason">
//                             <Form.Label>신고 사유</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 value={reportReason}
//                                 onChange={(e) => setReportReason(e.target.value)}
//                                 required
//                             >
//                                 <option value="">사유 선택</option>
//                                 <option value="부적절한 단어">부적절한 단어</option>
//                                 <option value="기타">기타</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="reportDetails" className="mt-3">
//                             <Form.Label>상세 설명</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 value={reportDetails}
//                                 onChange={(e) => setReportDetails(e.target.value)}
//                                 placeholder="신고에 대한 추가 설명을 입력하세요."
//                             />
//                         </Form.Group>
//                         <div className="mt-3">
//                             <Button type="submit" disabled={isSubmitting}>
//                                 {isSubmitting ? '제출 중...' : '신고하기'}
//                             </Button>
//                             <Button
//                                 variant="secondary"
//                                 className="ms-2"
//                                 onClick={() => navigate(`/learning/${cardNumber}`)}
//                             >
//                                 취소
//                             </Button>
//                         </div>
//                     </Form>
//                 </Card.Body>
//             </Card>
//         </div>
//     );
// };
//
// export default ReportPage;
//
// const styles = {
//     container: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         backgroundColor: '#f9f9f9',
//         padding: '20px',
//     },
//     card: {
//         width: '100%',
//         maxWidth: '500px',
//         borderRadius: '10px',
//         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//         padding: '20px',
//     },
//     header: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: '20px',
//     },
//     title: {
//         marginLeft: '10px',
//         color: '#333',
//         fontSize: '24px',
//         fontWeight: 'bold',
//     },
//     cardInfo: {
//         textAlign: 'center',
//         marginBottom: '20px',
//         color: '#555',
//     },
//     alert: {
//         display: 'flex',
//         alignItems: 'center',
//         marginBottom: '15px',
//     },
//     icon: {
//         marginRight: '8px',
//         verticalAlign: 'middle',
//     },
//     formGroup: {
//         marginBottom: '15px',
//     },
//     input: {
//         borderRadius: '5px',
//         border: '1px solid #ddd',
//         padding: '10px',
//     },
//     textArea: {
//         borderRadius: '5px',
//         border: '1px solid #ddd',
//         padding: '10px',
//     },
//     buttonContainer: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         marginTop: '20px',
//     },
//     submitButton: {
//         backgroundColor: '#ffcc00',
//         color: '#333',
//         border: 'none',
//         borderRadius: '5px',
//         padding: '10px 20px',
//         fontWeight: 'bold',
//     },
//     cancelButton: {
//         backgroundColor: '#ccc',
//         color: '#333',
//         border: 'none',
//         borderRadius: '5px',
//         padding: '10px 20px',
//         fontWeight: 'bold',
//     },
// };

// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// import axios from 'axios';
//
// const ReportPage = () => {
//     const { cardNumber } = useParams(); // URL에서 cardNumber 가져오기
//     const navigate = useNavigate();
//     const [reportReason, setReportReason] = useState('');
//     const [reportDetails, setReportDetails] = useState('');
//     const apiUrl = process.env.REACT_APP_API_URL;
//
//     const handleReportSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post(`${apiUrl}/api/report`, {
//                 cardNumber,
//                 reason: reportReason,
//                 details: reportDetails,
//             });
//             alert('신고가 완료되었습니다.');
//             navigate(`/learning/${cardNumber}`); // 신고 완료 후 학습 페이지로 이동
//         } catch (error) {
//             console.error('신고 실패:', error);
//             alert('신고에 실패했습니다. 다시 시도해주세요.');
//         }
//     };
//
//     return (
//         <div>
//             <h1>신고하기</h1>
//             <Form onSubmit={handleReportSubmit}>
//                 <Form.Group controlId="reason">
//                     <Form.Label>신고 사유</Form.Label>
//                     <Form.Control
//                         as="select"
//                         value={reportReason}
//                         onChange={(e) => setReportReason(e.target.value)}
//                         required
//                     >
//                         <option value="">사유를 선택하세요</option>
//                         <option value="부적절한 단어">부적절한 단어</option>
//                         <option value="기타">기타</option>
//                     </Form.Control>
//                 </Form.Group>
//                 <Form.Group controlId="details">
//                     <Form.Label>상세 내용</Form.Label>
//                     <Form.Control
//                         as="textarea"
//                         rows={3}
//                         value={reportDetails}
//                         onChange={(e) => setReportDetails(e.target.value)}
//                     />
//                 </Form.Group>
//                 <Button type="submit">신고</Button>
//             </Form>
//         </div>
//     );
// };
//
// export default ReportPage;