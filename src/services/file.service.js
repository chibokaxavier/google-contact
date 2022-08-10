import { saveAs } from "file-saver";
import Papa from "papaparse";
import { jsPDF } from "jspdf";
class FileService {
  exportToCSV(json, filename) {
    let content = Papa.unparse(json);
    let blob = new Blob([content], {
      type: "text/plain",
    });
    this.saveFile(filename, blob);
  }

  exportToJSON(content) {
    let json = Papa.parse(content).data;
    let keys = json[0];
    let result = [];
    for (let i = 1; i < json.length; i++) {
      let record = {};
      keys.map((key, index) => {
        record[key] = json[i][index];
      });
      result.push(record);
    }
    return result;
  }

  saveFile(filename, fileContent) {
    saveAs(fileContent, filename);
  }

  printAsPdf(json) {
    let x = 0,
      y = 10;
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(new Date().toDateString(), x, y);
    doc.text("Xavier Contacts", x + 90, y);
    y += 20;
    json.map((contact) => {
      doc.setFontSize(20);
      doc.text(contact.firstName + " " + contact.lastName, x, y);
      y += 10;
      doc.setFontSize(10);
      doc.text("phone number", x, y);
      doc.text(contact.phone, x + 90, y);
      doc.text("mobile", x+ 90 + 50, y)
      y += 5;
      doc.line(x, y, x + 190, y);
      y += 10;
    });
    doc.autoPrint();
    doc.output("dataurlnewwindow");
  }
}
let fileService = new FileService();
export { fileService };
