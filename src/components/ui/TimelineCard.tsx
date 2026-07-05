import { forwardRef } from "react";
import { CareerHistoryItem } from "../../data/experience";

interface TimelineCardProps {
  historyItem: CareerHistoryItem;
  itemIndex: number;
  detailRef: (el: HTMLDivElement | null) => void;
}

export const TimelineCard = forwardRef<HTMLDivElement, TimelineCardProps>(
  ({ historyItem, itemIndex, detailRef }, ref) => {
    return (
      <div className="career-info-box" ref={ref}>
        <div className="career-info-in">
          <div className="career-role">
            <h4>{historyItem.title}</h4>
            <h5>{historyItem.institution}</h5>
          </div>
          <h3>{historyItem.year}</h3>
        </div>
        <div className="career-info-details" ref={detailRef}>
          <p>{historyItem.details}</p>
          {historyItem.bullets && (
            <ul className="career-bullets">
              {historyItem.bullets.map((bulletText, bulletIdx) => (
                <li key={`bullet-${itemIndex}-${bulletIdx}`}>{bulletText}</li>
              ))}
            </ul>
          )}
          {historyItem.certificate && (
            <div className="career-cert-link">
              <a
                href={historyItem.certificate}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                📄 View Internship Certificate
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
);

TimelineCard.displayName = "TimelineCard";
export default TimelineCard;
