import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import './TextEditor.css';


const TextEditor = () => {
    // Refs for the canvas and the fabric.js canvas instance
    const canvasRef = useRef(null);
    const canvas = useRef(null);

    // State variables for controlling font size, family, and text color
    const [fontSize, setFontSize] = useState(20);
    const [fontFamily, setFontFamily] = useState('"Helvetica Neue"');
    const [textColor, setTextColor] = useState('#ffffff');

    // Initialize the fabric.js canvas on component mount
    useEffect(() => {
        canvas.current = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 600,
        });

        // Event handler for zooming with the mouse wheel
        const handleWheel = (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                const delta = e.deltaY;
                let newZoom = canvas.current.getZoom() + delta / 1000;
                newZoom = Math.max(0.1, newZoom);
                newZoom = Math.min(5, newZoom);
                canvas.current.setZoom(newZoom);
            }
        };

        // Attaching  the wheel event listener and clean up on component unmount
        const canvasElement = canvasRef.current;
        canvasElement.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            canvasElement.removeEventListener('wheel', handleWheel);
            canvas.current.dispose();
        };
    }, []);

    // Handler for font size changes
    const handleFontSizeChange = (value) => {
        setFontSize(value);
        const activeObject = canvas.current.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('fontSize', value);
            canvas.current.requestRenderAll();
        }
    };

    // Handler for font family changes
    const handleFontFamilyChange = (value) => {
        setFontFamily(value);
        const activeObject = canvas.current.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('fontFamily', value);
            canvas.current.requestRenderAll();
        }
    };

    // Handler for text color changes
    const handleTextColorChange = (color) => {
        setTextColor(color);
        const activeObject = canvas.current.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('fill', color);
            canvas.current.requestRenderAll();
        }
    };

    // Handler for adding text to the canvas
    const addText = () => {
        const textbox = new fabric.Textbox('Type here', {
            left: 50,
            top: 50,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fill: textColor,
            hasControls: true,
            lockScalingX: false,
            lockScalingY: false,
            lockRotation: false,
            lockUniScaling: false,
            movable: true,
            selectable: true,
        });

        canvas.current.add(textbox).setActiveObject(textbox);
    };

    return (
        <div className="text-editor-container">
            <div className="text-editor-property-controls">
                <label>Font Size:</label>
                <input
                    className="text-editor-input"
                    type="number"
                    value={fontSize}
                    onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                />
                <label>Font Family:</label>
                <select
                    className="text-editor-input"
                    value={fontFamily}
                    onChange={(e) => handleFontFamilyChange(e.target.value)}
                >
                    {/* Mapping font options */}
                    {['"Helvetica Neue"',
                        'Georgia, serif',
                        '"Palatino Linotype", "Book Antiqua", Palatino, serif',
                        '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
                        '"Trebuchet MS", Helvetica, sans-serif',
                        '"Courier New", Courier, monospace',
                        '"Brush Script MT", cursive',
                        'Impact, Charcoal, sans-serif',].map(
                            (font) => (
                                <option key={font} value={font}>
                                    {font}
                                </option>
                            )
                        )}
                </select>
                <label>Text Color:</label>
                <input
                    className="text-editor-input"
                    type="color"
                    value={textColor}
                    onChange={(e) => handleTextColorChange(e.target.value)}
                />
                <button className="text-editor-button" onClick={addText}>
                    Add Text
                </button>
            </div>
            <canvas className="text-editor-canvas" ref={canvasRef}></canvas>
        </div>
    );
};

export default TextEditor;
