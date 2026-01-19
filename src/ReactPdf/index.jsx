import React from 'react';
import { 
  Document, 
  Page, 
  View, 
  Text, 
  StyleSheet,
  Image,
  BlobProvider 
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 40,
    position: 'relative',
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    opacity: 0.1,
    zIndex: -1,
  },
  watermarkText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'gray',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});

const Watermark = () => (
  <View fixed style={styles.watermark}>
    <Text style={styles.watermarkText}>CONFIDENTIAL</Text>
  </View>
);

const MyDocument = ({ data }) => (
  <Document>
    {data.map((item, index) => (
      <Page key={index} size="A4" style={styles.page}>
        <Watermark />
        <Text style={styles.header}>Invoice #{item.id}</Text>
        <View style={styles.content}>
          <Text>Date: {item.date}</Text>
          <Text>Client: {item.client}</Text>
          <Text>Amount: ${item.amount}</Text>
          <Text>Items: {item.items.length}</Text>
        </View>
        {/* Dummy content to fill page */}
        <View style={{ marginTop: 50 }}>
          {Array(20).fill().map((_, i) => (
            <Text key={i}>Item {i + 1}: Product description line {i + 1}</Text>
          ))}
        </View>
      </Page>
    ))}
  </Document>
);

const PDFGenerator = () => {
  const dummyData = [
    { id: 1001, date: '2025-12-01', client: 'Acme Corp', amount: 2500, items: ['Widget A', 'Widget B'] },
    { id: 1002, date: '2025-12-02', client: 'Beta Inc', amount: 1800, items: ['Gadget X', 'Tool Y'] },
    { id: 1003, date: '2025-12-03', client: 'Gamma Ltd', amount: 3200, items: ['Service Z', 'Part Q'] },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Multi-Page PDF Generat</h1>
      <BlobProvider document={<MyDocument data={dummyData} />}>
        {({ blob, url, loading, error }) => (
          <div>
            <button 
              disabled={loading}
              onClick={() => {
                const link = document.createElement('a');
                link.href = url;
                link.download = 'invoices-with-watermark.pdf';
                link.click();
              }}
            >
              {loading ? 'Generating...' : 'Download PDF'}
            </button>
            {blob && (
              <iframe 
                src={url} 
                style={{ width: '100%', height: '600px', marginTop: 20, border: '1px solid #ccc' }}
              />
            )}
          </div>
        )}
      </BlobProvider>
    </div>
  );
};

export default PDFGenerator;
