package vn.diepgia.mchis.DebtManagement.services;

import com.itextpdf.text.*;

import com.itextpdf.text.pdf.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.Invoice;
import vn.diepgia.mchis.DebtManagement.models.InvoiceLine;

import java.io.File;
import java.io.FileOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.logging.Logger;
import java.util.List;

import static java.io.File.separator;

@Service
public class PdfGeneratorService {

    @Value("${application.file}")
    private String destinationFolder;

    @Value("${application.fonts}")
    private String fontFile;

    private static final Logger LOGGER = Logger.getLogger(PdfGeneratorService.class.getName());

    public String generatePdf(Invoice invoice)  {
        try {
            Document document = new Document();
            String fileName = generateFileName(invoice.getId());
            PdfWriter.getInstance(document, new FileOutputStream(fileName));
            File fontFile = new File(this.fontFile);
            BaseFont bf = BaseFont.createFont(fontFile.getAbsolutePath(), BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            document.open();
            Font textFont = new Font(bf, 10.5f);
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100); // Make table take full width

            // Left Chunk
            PdfPCell leftCell = new PdfPCell(new Phrase("CÔNG TY TNHH SX TM DIỆP GIA", new Font(bf, 12, Font.BOLD)));
            leftCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
            table.addCell(leftCell);

            // Right Chunk
            Paragraph temp = new Paragraph();
            temp.setIndentationLeft(20);
            temp.add(new Chunk("Số phiếu: ",  new Font(bf, 10, Font.BOLD)));
            temp.add(new Chunk(invoice.getId(), textFont));
            PdfPCell rightCell = new PdfPCell(new Phrase(temp));
            rightCell.setPaddingRight(10f);
            rightCell.setHorizontalAlignment(PdfPCell.ALIGN_RIGHT); // Align text to the right
            rightCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
            table.addCell(rightCell);

            document.add(table);

            document.add(new Paragraph("Địa chỉ: Lô 7 Cụm Công Nghiệp Nhị Xuân - Ấp 5 - Xã Xuân Thới Sơn - Hóc môn", new Font(bf, 10)));
            temp = new Paragraph("PHIẾU XUẤT HÀNG", new Font(bf, 20, Font.BOLD));
            temp.setAlignment(Element.ALIGN_CENTER);
            temp.setSpacingBefore(10);
            temp.setSpacingAfter(10);
            document.add(temp);

            // invoice info
            table = new PdfPTable(2);
            table.setHorizontalAlignment(PdfPCell.ALIGN_LEFT);
            table.setWidthPercentage(50);

            // Customer ID
            // Left Chunk
            leftCell = new PdfPCell(new Phrase("Mã khách hàng: ", new Font(bf, 10, Font.BOLD)));
            leftCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            leftCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
            table.addCell(leftCell);
            // Right Chunk
            rightCell = new PdfPCell(new Phrase(invoice.getCustomer().getCustomerId(), textFont));
            rightCell.setHorizontalAlignment(PdfPCell.ALIGN_LEFT); // Align text to the right
            rightCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
            table.addCell(rightCell);

            // Customer name
            // Left Chunk
            leftCell = new PdfPCell(new Phrase("Khách hàng: ", new Font(bf, 10, Font.BOLD)));
            leftCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            leftCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
            table.addCell(leftCell);
            // Right Chunk
            rightCell = new PdfPCell(new Phrase(invoice.getCustomer().getName(), textFont));
            rightCell.setHorizontalAlignment(PdfPCell.ALIGN_LEFT); // Align text to the right
            rightCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
            table.addCell(rightCell);

            // Customer telephone
            // Left Chunk
            leftCell = new PdfPCell(new Phrase("Số điện thoại: ", new Font(bf, 10, Font.BOLD)));
            leftCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            leftCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
            table.addCell(leftCell);
            // Right Chunk
            rightCell = new PdfPCell(new Phrase(invoice.getCustomer().getTelephone(), textFont));
            rightCell.setHorizontalAlignment(PdfPCell.ALIGN_LEFT); // Align text to the right
            rightCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
            table.addCell(rightCell);

            // Customer province
            // Left Chunk
            leftCell = new PdfPCell(new Phrase("Tỉnh/Thành phố: ", new Font(bf, 10, Font.BOLD)));
            leftCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            leftCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
            table.addCell(leftCell);
            // Right Chunk
            rightCell = new PdfPCell(new Phrase(invoice.getCustomer().getProvince(), textFont));
            rightCell.setHorizontalAlignment(PdfPCell.ALIGN_LEFT); // Align text to the right
            rightCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
            table.addCell(rightCell);

            // Date
            // Left Chunk
            leftCell = new PdfPCell(new Phrase("Ngày xuất: ", new Font(bf, 10, Font.BOLD)));
            leftCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            leftCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
            table.addCell(leftCell);
            // Right Chunk
            rightCell = new PdfPCell(new Phrase(invoice.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")), textFont));
            rightCell.setHorizontalAlignment(PdfPCell.ALIGN_LEFT); // Align text to the right
            rightCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
            table.addCell(rightCell);

            document.add(table);

            // Invoice details
            table = new PdfPTable(6);
            table.setSpacingBefore(20);
            table.setSpacingAfter(10);
            table.setWidthPercentage(100);
            table.setWidths(new float[] { 0.75f, 2f, 3f, 3f, 2.25f, 2f });
            // Table header
            var header = new PdfPHeaderCell();
            header.setPhrase(new Paragraph("STT", new Font(bf, 12, Font.BOLD)));
            table.addCell(header);

            header = new PdfPHeaderCell();
            header.setPhrase(new Paragraph("MSP", new Font(bf, 12, Font.BOLD)));
            table.addCell(header);

            header = new PdfPHeaderCell();
            header.setPhrase(new Paragraph("Tên sản phẩm", new Font(bf, 12, Font.BOLD)));
            table.addCell(header);

            header = new PdfPHeaderCell();
            header.setPhrase(new Paragraph("Quy cách đóng thùng", new Font(bf, 12, Font.BOLD)));
            table.addCell(header);

            header = new PdfPHeaderCell();
            header.setPhrase(new Paragraph("Số lượng thùng", new Font(bf, 12, Font.BOLD)));
            table.addCell(header);

            header = new PdfPHeaderCell();
            header.setPhrase(new Paragraph("Ghi chú", new Font(bf, 12, Font.BOLD)));
            table.addCell(header);

            // Table detail
            var cell = new PdfPCell();
            List<InvoiceLine> lines = invoice.getInvoiceLines();
            Font tableFont = new Font(bf, 10);
            for (int i = 0 ; i < lines.size() ; i++) {
                InvoiceLine line = lines.get(i);
                cell = new PdfPCell();
                cell.setPhrase(new Paragraph(String.valueOf(i + 1), tableFont));
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);

                cell = new PdfPCell();
                cell.setPhrase(new Paragraph(line.getProduct().getProductId(), tableFont));
                table.addCell(cell);

                cell = new PdfPCell();
                cell.setPhrase(new Paragraph(line.getProduct().getName(), tableFont));
                table.addCell(cell);

                cell = new PdfPCell();
                cell.setPhrase(new Paragraph(line.getNumberOfBoxes() * line.getSpecification().getAmountPerBox() + " " + line.getSpecification().getUnit(), tableFont));
                table.addCell(cell);

                cell = new PdfPCell();
                cell.setPhrase(new Paragraph(String.valueOf(line.getNumberOfBoxes()), tableFont));
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);

                cell = new PdfPCell();
                cell.setPhrase(new Paragraph(line.getNote(), tableFont));
                table.addCell(cell);
            }
            document.add(table);

            // Recap
            document.add(new Chunk(Chunk.TABBING));
            document.add(new Chunk("NGƯỜI LÀM PHIẾU: ",  new Font(bf, 10, Font.BOLD)));
            document.add(new Chunk(Chunk.TABBING));
            document.add(new Chunk(Chunk.TABBING));
            document.add(new Chunk("NGƯỜI XUẤT HÀNG: ",  new Font(bf, 10, Font.BOLD)));
            document.add(new Chunk(Chunk.TABBING));
            document.add(new Chunk(Chunk.TABBING));
            document.add(new Chunk("NGƯỜI NHẬN HÀNG: ",  new Font(bf, 10, Font.BOLD)));

            document.close();
            return fileName;
        } catch(Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    private String generateFileName(String invoiceId) {
        File targetFolder = new File(destinationFolder);
        if (!targetFolder.exists()) {
            boolean folderCreated = targetFolder.mkdirs();
            if (!folderCreated) {
                LOGGER.severe("Failed to create folder " + targetFolder.getAbsolutePath());
                return null;
            }
        }
        return String.format(destinationFolder + separator + "Hóa-đơn-%s.pdf", invoiceId);
    }
}
