import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    position: "relative",
  },
  watermark: {
    position: "absolute",
    fontSize: 80,
    color: "rgba(200, 200, 200, 0.3)",
    transform: "rotate(-45deg)",
    top: "40%",
    left: "15%",
    zIndex: 0,
  },
  content: {
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#1e40af",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#374151",
    fontWeight: "bold",
  },
  text: {
    marginBottom: 8,
    lineHeight: 1.5,
    color: "#4b5563",
  },
  table: {
    marginTop: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 8,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#1e40af",
    paddingVertical: 10,
    backgroundColor: "#f3f4f6",
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
  },
  tableCellHeader: {
    flex: 1,
    fontSize: 11,
    fontWeight: "bold",
    color: "#1e40af",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 10,
    color: "#9ca3af",
  },
});

const dummyData = {
  invoice: {
    number: "INV-2024-001",
    date: "2024-12-05",
    dueDate: "2024-12-20",
  },
  company: {
    name: "TechCorp Solutions Ltd.",
    address: "123 Business Street, Suite 456",
    city: "San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    email: "info@techcorp.com",
  },
  client: {
    name: "Acme Corporation",
    address: "789 Enterprise Avenue",
    city: "New York, NY 10001",
    contact: "John Smith",
    email: "john.smith@acme.com",
  },
  items: [
    {
      id: 1,
      description: "Web Development Services",
      quantity: 40,
      rate: 150,
      amount: 6000,
    },
    {
      id: 2,
      description: "UI/UX Design",
      quantity: 20,
      rate: 120,
      amount: 2400,
    },
    {
      id: 3,
      description: "Backend API Development",
      quantity: 35,
      rate: 140,
      amount: 4900,
    },
    {
      id: 4,
      description: "Database Design & Setup",
      quantity: 15,
      rate: 130,
      amount: 1950,
    },
    {
      id: 5,
      description: "Testing & QA",
      quantity: 25,
      rate: 100,
      amount: 2500,
    },
  ],
  projectDetails: [
    {
      phase: "Phase 1: Planning",
      description:
        "Initial project planning, requirements gathering, and architecture design.",
      duration: "2 weeks",
      status: "Completed",
    },
    {
      phase: "Phase 2: Development",
      description:
        "Core feature development, database setup, and API integration.",
      duration: "6 weeks",
      status: "Completed",
    },
    {
      phase: "Phase 3: Testing",
      description:
        "Comprehensive testing, bug fixes, and performance optimization.",
      duration: "2 weeks",
      status: "In Progress",
    },
  ],
  notes: [
    "Payment terms: Net 15 days",
    "Late payment fee: 2% per month",
    "All services rendered in accordance with the signed service agreement",
    "For any questions, please contact our billing department",
  ],
};

const PDFDocument = () => {
  const total = dummyData.items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>SAMPLE</Text>

        <View style={styles.content}>
          <Text style={styles.header}>Invoice Report</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Invoice Information</Text>
            <Text style={styles.text}>
              Invoice Number: {dummyData.invoice.number}
            </Text>
            <Text style={styles.text}>Date: {dummyData.invoice.date}</Text>
            <Text style={styles.text}>
              Due Date: {dummyData.invoice.dueDate}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>From</Text>
            <Text style={styles.text}>{dummyData.company.name}</Text>
            <Text style={styles.text}>{dummyData.company.address}</Text>
            <Text style={styles.text}>{dummyData.company.city}</Text>
            <Text style={styles.text}>{dummyData.company.phone}</Text>
            <Text style={styles.text}>{dummyData.company.email}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <Text style={styles.text}>{dummyData.client.name}</Text>
            <Text style={styles.text}>{dummyData.client.address}</Text>
            <Text style={styles.text}>{dummyData.client.city}</Text>
            <Text style={styles.text}>
              Attention: {dummyData.client.contact}
            </Text>
            <Text style={styles.text}>{dummyData.client.email}</Text>
          </View>
        </View>

        <Text style={styles.footer}>Page 1 of 3</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>SAMPLE</Text>

        <View style={styles.content}>
          <Text style={styles.header}>Services Breakdown</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Items & Services</Text>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCellHeader}>Description</Text>
                <Text style={styles.tableCellHeader}>Qty</Text>
                <Text style={styles.tableCellHeader}>Rate</Text>
                <Text style={styles.tableCellHeader}>Amount</Text>
              </View>

              {dummyData.items.map((item) => (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.description}</Text>
                  <Text style={styles.tableCell}>{item.quantity}</Text>
                  <Text style={styles.tableCell}>${item.rate}</Text>
                  <Text style={styles.tableCell}>${item.amount}</Text>
                </View>
              ))}

              <View
                style={[
                  styles.tableRow,
                  {
                    borderTopWidth: 2,
                    borderTopColor: "#1e40af",
                    marginTop: 10,
                  },
                ]}
              >
                <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
                  Total
                </Text>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableCell}></Text>
                <Text
                  style={[
                    styles.tableCell,
                    { fontWeight: "bold", color: "#1e40af" },
                  ]}
                >
                  ${total}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>Page 2 of 3</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>SAMPLE</Text>

        <View style={styles.content}>
          <Text style={styles.header}>Project Details</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Project Phases</Text>
            {dummyData.projectDetails.map((phase, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text
                  style={[
                    styles.text,
                    { fontWeight: "bold", color: "#1e40af" },
                  ]}
                >
                  {phase.phase}
                </Text>
                <Text style={styles.text}>{phase.description}</Text>
                <Text style={styles.text}>Duration: {phase.duration}</Text>
                <Text style={styles.text}>Status: {phase.status}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Terms & Conditions</Text>
            {dummyData.notes.map((note, index) => (
              <Text key={index} style={styles.text}>
                • {note}
              </Text>
            ))}
          </View>

          <View style={[styles.section, { marginTop: 30 }]}>
            <Text style={[styles.text, { textAlign: "center", fontSize: 14 }]}>
              Thank you for your business!
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>Page 3 of 3</Text>
      </Page>
    </Document>
  );
};

export default PDFDocument;
