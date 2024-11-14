package vn.diepgia.mchis.DebtManagement.services;

import com.itextpdf.text.*;

import com.itextpdf.text.pdf.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import vn.diepgia.mchis.DebtManagement.models.Customer;
import vn.diepgia.mchis.DebtManagement.models.Invoice;
import vn.diepgia.mchis.DebtManagement.models.InvoiceLine;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.logging.Logger;
import java.util.List;
import java.util.stream.Stream;

import static java.io.File.separator;

@Service
public class PdfGeneratorService {

    @Value("${application.file}")
    private String destinationFolder;

    @Value("${application.fonts}")
    private String fontFilePath;

    private static final Logger LOGGER = Logger.getLogger(PdfGeneratorService.class.getName());

    private PdfPTable createHeader(BaseFont bf, String id, boolean customerPart) throws DocumentException {
        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100); // Make table take full width
        table.setWidths(new int[] {5, 1});
        Font textFont = new Font(bf, 10.5f);
        // Left Chunk
        PdfPCell leftCell = new PdfPCell(new Phrase("CÔNG TY TNHH SX TM DIỆP GIA", new Font(bf, 12, Font.BOLD)));
        leftCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(leftCell);

        // Right Chunk
        Paragraph temp = new Paragraph();
        temp.setIndentationLeft(20);
        temp.add(new Chunk("Số phiếu: ",  new Font(bf, 10, Font.BOLD)));
        temp.add(new Chunk(id, textFont));
        PdfPCell rightCell = new PdfPCell(new Phrase(temp));
        rightCell.setPaddingRight(10f);
        rightCell.setHorizontalAlignment(PdfPCell.ALIGN_RIGHT); // Align text to the right
        rightCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(rightCell);

        // Left Chunk
        leftCell = new PdfPCell(new Phrase("Địa chỉ: Lô 7 Cụm Công Nghiệp Nhị Xuân - Ấp 5 - Xã Xuân Thới Sơn - Hóc môn", textFont));
        leftCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(leftCell);

        // Right Chunk
        rightCell = new PdfPCell(new Phrase(customerPart ? "Lưu khách hàng" : "Lưu công ty", textFont));
        rightCell.setPaddingRight(10f);
        rightCell.setHorizontalAlignment(PdfPCell.ALIGN_RIGHT); // Align text to the right
        rightCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(rightCell);
        return table;
    }

    private Paragraph createTitle(BaseFont bf) {
        Paragraph title = new Paragraph("PHIẾU XUẤT HÀNG", new Font(bf, 20, Font.BOLD));
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingBefore(10);
        title.setSpacingAfter(10);
        return title;
    }

    private PdfPTable createCustomerInfo(BaseFont bf, Customer customer, LocalDate date) throws DocumentException {
        PdfPTable table = new PdfPTable(2);
        table.setWidths(new int[] {1, 3});
        table.setHorizontalAlignment(PdfPCell.ALIGN_LEFT);
        table.setWidthPercentage(70);
        Font textFont = new Font(bf, 10.5f);
        Font headerFont = new Font(bf, 10.5f, Font.BOLD);

        // Customer ID
        // Left Chunk
        PdfPCell leftCell = new PdfPCell(new Phrase("Mã khách hàng: ", headerFont));
        leftCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        leftCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(leftCell);
        // Right Chunk
        PdfPCell rightCell = new PdfPCell(new Phrase(customer.getCustomerId(), textFont));
        rightCell.setHorizontalAlignment(PdfPCell.ALIGN_LEFT); // Align text to the right
        rightCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(rightCell);

        // Customer name
        // Left Chunk
        leftCell = new PdfPCell(new Phrase("Khách hàng: ", headerFont));
        leftCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        leftCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(leftCell);
        // Right Chunk
        rightCell = new PdfPCell(new Phrase(customer.getName(), textFont));
        rightCell.setHorizontalAlignment(PdfPCell.ALIGN_LEFT); // Align text to the right
        rightCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(rightCell);

        // Customer telephone
        // Left Chunk
        leftCell = new PdfPCell(new Phrase("Số điện thoại: ", headerFont));
        leftCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        leftCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(leftCell);
        // Right Chunk
        rightCell = new PdfPCell(new Phrase(customer.getTelephone(), textFont));
        rightCell.setHorizontalAlignment(PdfPCell.ALIGN_LEFT); // Align text to the right
        rightCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(rightCell);

        // Customer province
        // Left Chunk
        leftCell = new PdfPCell(new Phrase("Tỉnh/Thành phố: ", headerFont));
        leftCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        leftCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(leftCell);
        // Right Chunk
        rightCell = new PdfPCell(new Phrase(customer.getProvince(), textFont));
        rightCell.setHorizontalAlignment(PdfPCell.ALIGN_LEFT); // Align text to the right
        rightCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(rightCell);

        // Date
        // Left Chunk
        leftCell = new PdfPCell(new Phrase("Ngày xuất: ", headerFont));
        leftCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        leftCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(leftCell);
        // Right Chunk
        rightCell = new PdfPCell(new Phrase(date.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")), textFont));
        rightCell.setHorizontalAlignment(PdfPCell.ALIGN_LEFT); // Align text to the right
        rightCell.setBorder(PdfPCell.NO_BORDER); // Remove cell borders
        table.addCell(rightCell);
        return table;
    }

    private PdfPTable createInvoiceDetails(BaseFont bf, List<InvoiceLine> lines) throws DocumentException {
        PdfPTable table = new PdfPTable(6);
        table.setSpacingBefore(20);
        table.setSpacingAfter(10);
        table.setWidthPercentage(100);
        table.setWidths(new float[] { 0.75f, 2f, 3f, 3f, 2.25f, 2f });
        Font headerFont = new Font(bf, 12, Font.BOLD);
        Font tableFont = new Font(bf, 10);

        // Table header
        var header = new PdfPHeaderCell();
        header.setPhrase(new Paragraph("STT", headerFont));
        table.addCell(header);

        header = new PdfPHeaderCell();
        header.setPhrase(new Paragraph("MSP", headerFont));
        table.addCell(header);

        header = new PdfPHeaderCell();
        header.setPhrase(new Paragraph("Tên sản phẩm", headerFont));
        table.addCell(header);

        header = new PdfPHeaderCell();
        header.setPhrase(new Paragraph("Quy cách đóng thùng", headerFont));
        table.addCell(header);

        header = new PdfPHeaderCell();
        header.setPhrase(new Paragraph("Số lượng thùng", headerFont));
        table.addCell(header);

        header = new PdfPHeaderCell();
        header.setPhrase(new Paragraph("Ghi chú", headerFont));
        table.addCell(header);

        // Table detail
        var cell = new PdfPCell();

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
        return table;
    }

    private List<Chunk> createFooter(BaseFont bf, boolean customerPart) {
        Font font = new Font(bf, 10, Font.BOLD);
        return customerPart ? List.of(
                new Chunk(Chunk.TABBING),
                new Chunk("NGƯỜI LÀM PHIẾU: ",  font),
                new Chunk(Chunk.TABBING),
                new Chunk(Chunk.TABBING),
                new Chunk("NGƯỜI XUẤT HÀNG: ",  font),
                new Chunk(Chunk.TABBING),
                new Chunk(Chunk.TABBING),
                new Chunk("NGƯỜI NHẬN HÀNG: ",  font),
                new Chunk(Chunk.NEWLINE),
                new Chunk(Chunk.NEWLINE),
                new Chunk(Chunk.NEWLINE)
        ) : List.of(
                new Chunk(Chunk.TABBING),
                new Chunk("NGƯỜI LÀM PHIẾU: ",  font),
                new Chunk(Chunk.TABBING),
                new Chunk(Chunk.TABBING),
                new Chunk("NGƯỜI XUẤT HÀNG: ",  font),
                new Chunk(Chunk.TABBING),
                new Chunk(Chunk.TABBING),
                new Chunk("NGƯỜI NHẬN HÀNG: ",  font)
        );
    }

    private List<? extends Element> create(BaseFont bf, Invoice invoice, boolean customerPart) throws DocumentException {
        return Stream.concat(
                Stream.of(
                        createHeader(bf, invoice.getId(), customerPart),
                        createTitle(bf),
                        createCustomerInfo(bf, invoice.getCustomer(), invoice.getDate()),
                        createInvoiceDetails(bf, invoice.getInvoiceLines())
                ),
                createFooter(bf, customerPart).stream()
        ).toList();
    }

    public String generatePdf(Invoice invoice)  {
        try {
            Document document = new Document();
            String fileName = generateFileName(invoice.getId());
            PdfWriter.getInstance(document, new FileOutputStream(Objects.requireNonNull(fileName)));
            File fontFile = new File(Objects.requireNonNull(getClass().getClassLoader().getResource(this.fontFilePath)).getFile());
            BaseFont bf = BaseFont.createFont(fontFile.getAbsolutePath(), BaseFont.IDENTITY_H, BaseFont.EMBEDDED);

            document.open();

            for(var chunk: create(bf, invoice, true)) {
                document.add(chunk);
            }

            for(var chunk: create(bf, invoice, false)) {
                document.add(chunk);
            }

            document.close();
            return fileName;
        } catch(Exception e) {
            LOGGER.severe(e.getMessage());
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
        return String.format(destinationFolder + "Hóa đơn %s.pdf", invoiceId);
    }
}
