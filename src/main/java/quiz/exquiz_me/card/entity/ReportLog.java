package quiz.exquiz_me.card.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "report_log")
public class ReportLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "card_number", referencedColumnName = "card_number")
    private Card card;  // 신고 대상 카드

    @Column(name = "reason")
    private String reason;  // 신고 사유

    @Column(name = "details")
    private String details;  // 신고 세부 내용

    @Column(name = "reported_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date reportedAt;  // 신고 시간

    @Column(name = "reporter_email")
    private String reporterEmail;  // 신고자 이메일
}
