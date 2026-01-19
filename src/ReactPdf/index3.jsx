import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, FileText, Loader2, CheckCircle2, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PDFDocument from "@/components/PDFDocument";

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const pageInfo = [
    {
      title: "Invoice",
      description: "Detailed service invoice with itemized billing",
      icon: FileText,
    },
    {
      title: "Performance Report",
      description: "Q4 2024 metrics and executive summary",
      icon: FileCheck,
    },
    {
      title: "Team Overview",
      description: "Individual contributions and statistics",
      icon: CheckCircle2,
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">PDF Generator</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Generate professional multi-page PDF documents with watermarks using React PDF Renderer.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Document Preview Card */}
          <Card className="shadow-lg border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <FileText className="h-5 w-5 text-primary" />
                Document Contents
              </CardTitle>
              <CardDescription>
                This PDF contains 3 pages with dummy business data and watermarks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pageInfo.map((page, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="p-2 rounded-md bg-primary/10 shrink-0">
                    <page.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Page {index + 1}: {page.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{page.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Download Card */}
          <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-accent/20">
            <CardHeader>
              <CardTitle className="text-foreground">Download Your PDF</CardTitle>
              <CardDescription>
                Click below to generate and download the multi-page document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
                <div className="w-20 h-24 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  <FileText className="h-10 w-10 text-primary" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Business_Report_2024.pdf</h4>
                <p className="text-sm text-muted-foreground">3 pages • ~250 KB</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Watermark on every page</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Professional formatting</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Print-ready quality</span>
                </div>
              </div>

              <PDFDownloadLink
                document={<PDFDocument />}
                fileName="Business_Report_2024.pdf"
                className="block"
              >
                {({ loading }) => (
                  <Button
                    size="lg"
                    className="w-full gap-2 h-12 text-base font-semibold"
                    disabled={loading}
                    onClick={() => setIsGenerating(true)}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5" />
                        Download PDF Document
                      </>
                    )}
                  </Button>
                )}
              </PDFDownloadLink>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-8">Built with Modern Technologies</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">⚛️</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">React</h3>
              <p className="text-sm text-muted-foreground">Component-based architecture</p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">React PDF</h3>
              <p className="text-sm text-muted-foreground">Client-side PDF generation</p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Tailwind CSS</h3>
              <p className="text-sm text-muted-foreground">Utility-first styling</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    position: "relative",
  },
  watermark: {
    position: "absolute",
    top: "40%",
    left: "15%",
    fontSize: 60,
    color: "#e0e8f0",
    transform: "rotate(-45deg)",
    opacity: 0.5,
    fontWeight: "bold",
  },
  header: {
    marginBottom: 30,
    borderBottom: "2px solid #2563eb",
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 10,
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingVertical: 4,
  },
  label: {
    fontSize: 11,
    color: "#64748b",
    width: "40%",
  },
  value: {
    fontSize: 11,
    color: "#1e293b",
    width: "60%",
    textAlign: "right",
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 4,
  },
  tableHeaderText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottom: "1px solid #e2e8f0",
  },
  tableCell: {
    fontSize: 10,
    color: "#374151",
    flex: 1,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#94a3b8",
    borderTop: "1px solid #e2e8f0",
    paddingTop: 10,
  },
  pageNumber: {
    fontSize: 10,
    color: "#64748b",
  },
  summaryBox: {
    backgroundColor: "#f1f5f9",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 11,
    color: "#475569",
  },
  summaryValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1e293b",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTop: "2px solid #2563eb",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2563eb",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2563eb",
  },
  paragraph: {
    fontSize: 11,
    color: "#475569",
    lineHeight: 1.6,
    textAlign: "justify",
  },
});

// Dummy data
const invoiceData = {
  invoiceNumber: "INV-2024-001",
  date: "December 5, 2024",
  dueDate: "January 5, 2025",
  company: {
    name: "TechCorp Solutions Inc.",
    address: "123 Innovation Drive, Suite 400",
    city: "San Francisco, CA 94102",
    email: "billing@techcorp.com",
  },
  client: {
    name: "Global Industries Ltd.",
    address: "456 Enterprise Blvd",
    city: "New York, NY 10001",
    contact: "John Smith",
  },
  items: [
    { description: "Web Development Services", quantity: 40, rate: 150, amount: 6000 },
    { description: "UI/UX Design", quantity: 25, rate: 120, amount: 3000 },
    { description: "Database Architecture", quantity: 15, rate: 175, amount: 2625 },
    { description: "API Integration", quantity: 20, rate: 140, amount: 2800 },
  ],
};

const reportData = {
  title: "Q4 2024 Performance Report",
  period: "October - December 2024",
  metrics: [
    { name: "Total Revenue", value: "$1,245,000" },
    { name: "Active Clients", value: "127" },
    { name: "Projects Completed", value: "45" },
    { name: "Customer Satisfaction", value: "98.5%" },
  ],
  highlights: [
    "Successfully launched 3 major enterprise applications",
    "Expanded team by 15 new developers",
    "Achieved 99.9% uptime across all services",
    "Reduced average project delivery time by 20%",
  ],
};

const teamData = [
  { name: "Alice Johnson", role: "Lead Developer", projects: 12, rating: "4.9" },
  { name: "Bob Williams", role: "Senior Designer", projects: 8, rating: "4.8" },
  { name: "Carol Davis", role: "Project Manager", projects: 15, rating: "4.7" },
  { name: "David Brown", role: "DevOps Engineer", projects: 10, rating: "4.9" },
  { name: "Eve Martinez", role: "QA Specialist", projects: 18, rating: "4.8" },
];

const PDFDocument = () => (
  <Document>
    {/* Page 1 - Invoice */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.watermark}>CONFIDENTIAL</Text>
      <View style={styles.header}>
        <Text style={styles.title}>INVOICE</Text>
        <Text style={styles.subtitle}>{invoiceData.invoiceNumber}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#1e293b", marginBottom: 5 }}>From:</Text>
            <Text style={{ fontSize: 10, color: "#475569" }}>{invoiceData.company.name}</Text>
            <Text style={{ fontSize: 10, color: "#475569" }}>{invoiceData.company.address}</Text>
            <Text style={{ fontSize: 10, color: "#475569" }}>{invoiceData.company.city}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#1e293b", marginBottom: 5 }}>To:</Text>
            <Text style={{ fontSize: 10, color: "#475569" }}>{invoiceData.client.name}</Text>
            <Text style={{ fontSize: 10, color: "#475569" }}>{invoiceData.client.address}</Text>
            <Text style={{ fontSize: 10, color: "#475569" }}>{invoiceData.client.city}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Invoice Date:</Text>
          <Text style={styles.value}>{invoiceData.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Due Date:</Text>
          <Text style={styles.value}>{invoiceData.dueDate}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Description</Text>
            <Text style={styles.tableHeaderText}>Qty</Text>
            <Text style={styles.tableHeaderText}>Rate</Text>
            <Text style={styles.tableHeaderText}>Amount</Text>
          </View>
          {invoiceData.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>${item.rate}</Text>
              <Text style={styles.tableCell}>${item.amount.toLocaleString()}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.summaryBox}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>$14,425.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (10%):</Text>
          <Text style={styles.summaryValue}>$1,442.50</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL DUE:</Text>
          <Text style={styles.totalValue}>$15,867.50</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Thank you for your business! • Payment due within 30 days • Page 1 of 3
      </Text>
    </Page>

    {/* Page 2 - Performance Report */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.watermark}>CONFIDENTIAL</Text>
      <View style={styles.header}>
        <Text style={styles.title}>{reportData.title}</Text>
        <Text style={styles.subtitle}>{reportData.period}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Performance Metrics</Text>
        {reportData.metrics.map((metric, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.label}>{metric.name}</Text>
            <Text style={styles.value}>{metric.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <Text style={styles.paragraph}>
          This quarter has been exceptionally productive for TechCorp Solutions. 
          We have successfully expanded our client base while maintaining our commitment 
          to quality and customer satisfaction. Our team has demonstrated remarkable 
          efficiency, completing 45 projects ahead of schedule while achieving our 
          highest customer satisfaction rating to date.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quarter Highlights</Text>
        {reportData.highlights.map((highlight, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: 8 }}>
            <Text style={{ fontSize: 11, color: "#2563eb", marginRight: 8 }}>•</Text>
            <Text style={{ fontSize: 11, color: "#475569" }}>{highlight}</Text>
          </View>
        ))}
      </View>

      <View style={styles.summaryBox}>
        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#1e293b", marginBottom: 10 }}>
          Looking Ahead - Q1 2025 Goals
        </Text>
        <Text style={styles.paragraph}>
          In the upcoming quarter, we aim to increase our revenue by 25%, onboard 
          20 new enterprise clients, and launch our new cloud infrastructure platform. 
          We will continue to invest in our team's professional development and 
          expand our service offerings.
        </Text>
      </View>

      <Text style={styles.footer}>
        Confidential Business Report • TechCorp Solutions Inc. • Page 2 of 3
      </Text>
    </Page>

    {/* Page 3 - Team Overview */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.watermark}>CONFIDENTIAL</Text>
      <View style={styles.header}>
        <Text style={styles.title}>Team Performance</Text>
        <Text style={styles.subtitle}>Q4 2024 Individual Contributions</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Performers</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Name</Text>
            <Text style={styles.tableHeaderText}>Role</Text>
            <Text style={styles.tableHeaderText}>Projects</Text>
            <Text style={styles.tableHeaderText}>Rating</Text>
          </View>
          {teamData.map((member, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{member.name}</Text>
              <Text style={styles.tableCell}>{member.role}</Text>
              <Text style={styles.tableCell}>{member.projects}</Text>
              <Text style={styles.tableCell}>⭐ {member.rating}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Team Statistics</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Total Team Members:</Text>
          <Text style={styles.value}>42</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Average Experience:</Text>
          <Text style={styles.value}>5.3 years</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Certifications Earned:</Text>
          <Text style={styles.value}>28</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Training Hours:</Text>
          <Text style={styles.value}>1,240 hours</Text>
        </View>
      </View>

      <View style={styles.summaryBox}>
        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#1e293b", marginBottom: 10 }}>
          Recognition & Awards
        </Text>
        <Text style={styles.paragraph}>
          This quarter, our team received the Industry Excellence Award for 
          innovative solutions in enterprise software development. Three team 
          members were promoted to senior positions, and we welcomed 5 new 
          talented professionals to our growing family.
        </Text>
      </View>

      <Text style={styles.footer}>
        Human Resources Report • Generated on December 5, 2024 • Page 3 of 3
      </Text>
    </Page>
  </Document>
);

export default PDFDocument;
