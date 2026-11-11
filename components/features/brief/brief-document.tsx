import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import type { BriefSheet } from "@/lib/brief";
import { colors } from "@/lib/colors";
import { formatIndex } from "@/lib/format";

export type BriefCredit = { studio: string; author: string; url: string };

Font.registerHyphenationCallback((word) => [word]);

const margin = 56;
const hairline = 0.5;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.paper,
    color: colors.ink,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.5,
    padding: margin,
    paddingBottom: margin + 40,
  },
  masthead: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: hairline,
    borderBottomColor: colors.ink,
    paddingBottom: 10,
  },
  label: {
    fontFamily: "Courier",
    fontSize: 7.5,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: colors.muted,
  },
  title: {
    fontFamily: "Times-Roman",
    fontSize: 40,
    lineHeight: 1.05,
    marginTop: 56,
    maxWidth: 440,
  },
  prepared: { marginTop: 14, color: colors.muted },
  answers: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 44,
    borderTopWidth: hairline,
    borderTopColor: colors.rule,
  },
  answer: {
    width: "50%",
    paddingTop: 12,
    paddingBottom: 20,
    paddingRight: 24,
    borderBottomWidth: hairline,
    borderBottomColor: colors.rule,
  },
  value: {
    fontFamily: "Times-Roman",
    fontSize: 17,
    lineHeight: 1.25,
    marginTop: 6,
  },
  swatches: {
    flexDirection: "row",
    height: 14,
    marginTop: 10,
    borderWidth: hairline,
    borderColor: colors.rule,
  },
  swatch: { flexGrow: 1 },
  summary: { marginTop: 8, color: colors.muted },
  notes: { marginTop: 32 },
  notesText: { marginTop: 8, maxWidth: 420 },
  footer: {
    position: "absolute",
    left: margin,
    right: margin,
    bottom: margin - 16,
    borderTopWidth: hairline,
    borderTopColor: colors.rule,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.5,
    color: colors.muted,
  },
});

type BriefDocumentProps = {
  sheet: BriefSheet;
  date: string;
  credit: BriefCredit;
};

export function BriefDocument({ sheet, date, credit }: BriefDocumentProps) {
  return (
    <Document
      title={`${credit.studio} brief: ${sheet.title}`}
      author={sheet.preparedFor ?? credit.studio}
      creator={credit.studio}
    >
      <Page size="LETTER" style={styles.page}>
        <View style={styles.masthead}>
          <Text style={styles.label}>{credit.studio}</Text>
          <Text style={styles.label}>{`Brief · ${date}`}</Text>
        </View>

        <Text style={styles.title}>{sheet.title}</Text>
        <Text style={styles.prepared}>
          {sheet.preparedFor
            ? `Prepared for ${sheet.preparedFor} on ${date}`
            : `Prepared on ${date}`}
        </Text>

        <View style={styles.answers}>
          {sheet.items.map((item, index) => (
            <View key={item.label} style={styles.answer} wrap={false}>
              <Text style={styles.label}>
                {`${formatIndex(index + 1)} — ${item.label}`}
              </Text>
              <Text style={styles.value}>{item.value}</Text>
              {item.label === "Palette" && sheet.palette && (
                <>
                  <View style={styles.swatches}>
                    {sheet.palette.colors.map((color) => (
                      <View
                        key={color}
                        style={[styles.swatch, { backgroundColor: color }]}
                      />
                    ))}
                  </View>
                  <Text style={styles.summary}>{sheet.palette.summary}</Text>
                </>
              )}
            </View>
          ))}
        </View>

        {sheet.notes && (
          <View style={styles.notes} wrap={false}>
            <Text style={styles.label}>Notes</Text>
            <Text style={styles.notesText}>{sheet.notes}</Text>
          </View>
        )}

        <View style={styles.footer} fixed>
          <Text>
            {`${credit.studio} is a concept studio, designed and built by ${credit.author}. ${credit.url}`}
          </Text>
          <Text>Made in your browser. Nothing was sent.</Text>
        </View>
      </Page>
    </Document>
  );
}
