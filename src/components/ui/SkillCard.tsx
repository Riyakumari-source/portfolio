import React, { useState, useEffect } from "react";
import { SkillItem } from "../../types/skill";

interface SkillCardProps {
  skill: SkillItem;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [offset, setOffset] = useState(176);
  const Icon = skill.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(176 - (skill.level / 100) * 176);
    }, 100);
    return () => clearTimeout(timer);
  }, [skill.level]);

  return (
    <div
      className="hex-card"
      style={{ "--skill-color": skill.color } as React.CSSProperties}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <svg className="hex-svg" viewBox="0 0 120 140" width="120" height="140">
        <polygon
          points="60,5 115,37 115,103 60,135 5,103 5,37"
          className="hex-polygon"
        />
        <circle cx="60" cy="70" r="28" className="circle-bg" />
        <circle
          cx="60"
          cy="70"
          r="28"
          className="circle-fill"
          strokeDasharray="176"
          strokeDashoffset={offset}
          transform="rotate(-90 60 70)"
        />
      </svg>
      <div className="hex-content">
        <div className="hex-icon-wrapper">
          <Icon className="hex-icon" />
        </div>
        <div className="hex-percentage">{skill.level}%</div>
      </div>
      <div className="hex-name">{skill.name}</div>
    </div>
  );
};

export default SkillCard;
