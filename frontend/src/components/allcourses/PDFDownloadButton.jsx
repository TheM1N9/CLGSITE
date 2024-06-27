import React from 'react';

class PDFDownloadButton extends React.Component {
  // Function to handle the download
  handleDownload = () => {
    const { pdfUrl } = this.props;
    
    // Create an anchor element
    const anchor = document.createElement('a');
    anchor.href = pdfUrl;
    
    // Set the download attribute to force download
    anchor.setAttribute('download', 'filename.pdf');
    
    // Append the anchor to the body and trigger the click event
    document.body.appendChild(anchor);
    anchor.click();
    
    // Clean up
    document.body.removeChild(anchor);
  }

  render() {
    var {cname}=this.props
    return (<>
      <button className="outline-btn"  onClick={this.handleDownload}>{cname}</button><br />
      <br /><br /></>
    );
  }
}

export default PDFDownloadButton;
