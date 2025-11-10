import { NextResponse } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export async function POST(req: Request) {
  try {
    const { items } = await req.json()

    // Créer un document PDF
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    let y = height - 50

    // Titre
    page.drawText(`Carnet d'entraînement`, {
      x: 50,
      y,
      size: 20,
      font: fontBold,
      color: rgb(0, 0, 0),
    })
    y -= 40

    if (!items || items.length === 0) {
      page.drawText(`Aucune séance enregistrée.`, {
        x: 50,
        y,
        size: 12,
        font,
      })
    } else {
      for (const w of items) {
        if (y < 80) {
          const newPage = pdfDoc.addPage()
          y = newPage.getSize().height - 50
        }

        const date = new Date(w.performed_at).toLocaleString('fr-FR')

        page.drawText(`${w.title}`, {
          x: 50,
          y,
          size: 14,
          font: fontBold,
        })
        y -= 20

        page.drawText(`${date}`, {
          x: 50,
          y,
          size: 10,
          font,
          color: rgb(0.4, 0.4, 0.4),
        })
        y -= 15

        if (w.notes) {
          page.drawText(`${w.notes}`, {
            x: 50,
            y,
            size: 12,
            font,
          })
          y -= 30
        } else {
          y -= 15
        }
      }
    }

    // Générer le PDF
    const pdfBytes = await pdfDoc.save()

    const buffer = Buffer.from(pdfBytes)

return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="workouts.pdf"',
      },
    })
  } catch (e) {
    console.error('PDF Error:', e)
    return NextResponse.json({ error: 'Erreur génération PDF' }, { status: 500 })
  }
}
