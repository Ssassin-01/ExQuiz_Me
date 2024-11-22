import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { AiOutlineWarning, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import axios from 'axios';
import { useUser } from '../../User/UserContext'; // UserContext 사용

const ReportPage = () => {
    const { cardNumber } = useParams(); // URL에서 cardNumber 가져오기
    const navigate = useNavigate();
    const [reportReason, setReportReason] = useState('');
    const [reportDetails, setReportDetails] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const apiUrl = `${window.location.origin}`;
    const { user } = useUser(); // UserContext에서 유저 정보 가져오기

    const handleReportSubmit = async (e) => {
        e.preventDefault();

        if (!reportReason) {
            alert('신고 사유를 선택해주세요!');
            return;
        }

        if (!user || !user.email) {
            alert('로그인된 사용자만 신고할 수 있습니다.');
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post(
                `${apiUrl}/api/report`,
                {
                    cardNumber,
                    reason: reportReason,
                    details: reportDetails,
                    reporterEmail: user.email,
                },
                {
                    withCredentials: true,
                }
            );
            setShowSuccessMessage(true);
            setTimeout(() => {
                navigate(`/learning/${cardNumber}`);
            }, 1000);
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
                                <option value="잘못된 정보">잘못된 정보</option>
                                <option value="부적절한 단어">부적절한 단어</option>
                                <option value="불쾌감을 주는 표현">불쾌감을 주는 표현</option>
                                <option value="스팸 내용">스팸 내용</option>
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


