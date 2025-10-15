import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageModal from './ImageModal';

const Step = ({ step, index, images }) => {
  const [modalImage, setModalImage] = useState(null);
  const [beforeImageIndex, setBeforeImageIndex] = useState(0);
  const [afterImageIndex, setAfterImageIndex] = useState(0);

  useEffect(() => {
    setBeforeImageIndex(0);
    setAfterImageIndex(0);
  }, [images]);

  const renderValue = (value, field) => {
    const isThought = field === 'thought';

    let content;
    if (typeof value === 'string') {
      content = <pre>{value}</pre>;
    } else if (typeof value === 'object' && value !== null) {
      content = <pre>{JSON.stringify(value, null, 2)}</pre>;
    } else if (value !== null && value !== undefined) {
      content = <pre>{String(value)}</pre>;
    }

    return (
      <div className={`value-wrapper ${isThought ? 'thought-field' : ''}`}>
        {content}
      </div>
    );
  };

  const fieldsToDisplay = ['code_output', 'tool_name', 'tool_output'];

  const handleNextBefore = () => { if (images && images.before) { setBeforeImageIndex((prevIndex) => (prevIndex + 1) % images.before.length); } };
  const handlePrevBefore = () => { if (images && images.before) { setBeforeImageIndex((prevIndex) => (prevIndex - 1 + images.before.length) % images.before.length); } };
  const handleNextAfter = () => { if (images && images.after) { setAfterImageIndex((prevIndex) => (prevIndex + 1) % images.after.length); } };
  const handlePrevAfter = () => { if (images && images.after) { setAfterImageIndex((prevIndex) => (prevIndex - 1 + images.after.length) % images.after.length); } };

  const currentBeforeImage = images?.before?.[beforeImageIndex];
  const currentAfterImage = images?.after?.[afterImageIndex];

  const beforeImageName = currentBeforeImage ? currentBeforeImage.name.substring(currentBeforeImage.name.lastIndexOf('/') + 1) : '';
  const afterImageName = currentAfterImage ? currentAfterImage.name.substring(currentAfterImage.name.lastIndexOf('/') + 1) : '';

  const processCode = (code) => {
    const thoughtLines = [];
    const codeLines = [];
    if (typeof code === 'string') {
        const lines = code.split('\n');

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('#')) {
                thoughtLines.push(trimmedLine.substring(1).trim());
            } else if (trimmedLine.startsWith('//')) {
                thoughtLines.push(trimmedLine.substring(2).trim());
            } else {
                codeLines.push(line);
            }
        });
    }
    return { extractedThoughts: thoughtLines.join('\n'), cleanedCode: codeLines.join('\n').trim() };
  };

  const fromToolCode = processCode(step.tool_code);
  const fromCode = processCode(step.code);

  const allThoughts = [
      step.thought,
      fromToolCode.extractedThoughts,
      fromCode.extractedThoughts
  ].filter(t => t).join('\n');

  const displayToolCode = fromToolCode.cleanedCode;
  const displayCode = fromCode.cleanedCode;

  return (
    <div className="step-card">
      <h3 className="step-title">Step {index}</h3>

      {images && (images.before?.length > 0 || images.after?.length > 0) ? (
        <div className="image-container">
          <div className="image-wrapper">
            {images.before?.length > 0 ? (
              <>
                <div className="image-header">
                  {images.before.length > 1 && <button className="carousel-button" onClick={handlePrevBefore}>&#8249;</button>}
                  <div className="image-info">
                    <h3>{beforeImageName}</h3>
                    {images.before.length > 1 && <span className="carousel-counter">{beforeImageIndex + 1} of {images.before.length}</span>}
                  </div>
                  {images.before.length > 1 && <button className="carousel-button" onClick={handleNextBefore}>&#8250;</button>}
                </div>
                <img src={currentBeforeImage.url} alt={beforeImageName} onClick={() => setModalImage(currentBeforeImage.url)} />
              </>
            ) : (
              <div className="no-image-placeholder">
                <p>Before image is not provided</p>
              </div>
            )}
          </div>
          <div className="image-wrapper">
            {images.after?.length > 0 ? (
              <>
                <div className="image-header">
                  {images.after.length > 1 && <button className="carousel-button" onClick={handlePrevAfter}>&#8249;</button>}
                  <div className="image-info">
                    <h3>{afterImageName}</h3>
                    {images.after.length > 1 && <span className="carousel-counter">{afterImageIndex + 1} of {images.after.length}</span>}
                  </div>
                  {images.after.length > 1 && <button className="carousel-button" onClick={handleNextAfter}>&#8250;</button>}
                </div>
                <img src={currentAfterImage.url} alt={afterImageName} onClick={() => setModalImage(currentAfterImage.url)} />
              </>
            ) : (
              <div className="no-image-placeholder">
                <p>After image is not provided</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>No images provided for this step.</p>
      )}

      {allThoughts && (
        <div className="step-section">
          <h4 className="step-key">Thought</h4>
          {renderValue(allThoughts, 'thought')}
        </div>
      )}

      {displayCode && (
        <div className="step-section">
          <h4 className="step-key">Code</h4>
          {renderValue(displayCode, 'code')}
        </div>
      )}

      {displayToolCode && (
        <div className="step-section">
          <h4 className="step-key">Tool Code</h4>
          {renderValue(displayToolCode, 'tool_code')}
        </div>
      )}

      {fieldsToDisplay.map(field => (
        step[field] && (
          <div key={field} className="step-section">
            <h4 className="step-key">{field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
            {renderValue(step[field], field)}
          </div>
        )
      ))}

      {modalImage && <ImageModal src={modalImage} alt="Enlarged view" onClose={() => setModalImage(null)} />}
    </div>
  );
};

Step.propTypes = {
  step: PropTypes.shape({
    thought: PropTypes.any,
    code: PropTypes.any,
    code_output: PropTypes.any,
    tool_code: PropTypes.any,
    tool_name: PropTypes.any,
    tool_output: PropTypes.any,
  }).isRequired,
  index: PropTypes.number.isRequired,
  images: PropTypes.shape({
    before: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string,
    })),
    after: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string,
    })),
  }),
};

export default Step;
