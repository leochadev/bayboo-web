import type { ReactNode } from 'react'
import './LegalDocumentPage.css'

type LegalDocumentPageProps = {
  title: string
  markdown: string
}

const tableDividerPattern = /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const tokenPattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|https?:\/\/[^\s)]+)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    if (match[2] && match[3]) {
      nodes.push(
        <a key={nodes.length} href={match[3]} target="_blank" rel="noreferrer">
          {match[2]}
        </a>,
      )
    } else if (match[4]) {
      nodes.push(<strong key={nodes.length}>{match[4]}</strong>)
    } else {
      const url = match[0]
      nodes.push(
        <a key={nodes.length} href={url} target="_blank" rel="noreferrer">
          {url}
        </a>,
      )
    }

    lastIndex = tokenPattern.lastIndex
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

function parseTableRow(line: string) {
  return line
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

function renderMarkdown(markdown: string) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    const trimmed = line.trim()

    if (!trimmed) {
      index += 1
      continue
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed)
    if (heading) {
      const level = heading[1].length
      const children = renderInline(heading[2])

      if (level === 1) {
        blocks.push(<h1 key={blocks.length}>{children}</h1>)
      } else if (level === 2) {
        blocks.push(<h2 key={blocks.length}>{children}</h2>)
      } else {
        blocks.push(<h3 key={blocks.length}>{children}</h3>)
      }

      index += 1
      continue
    }

    if (
      trimmed.includes('|') &&
      index + 1 < lines.length &&
      tableDividerPattern.test(lines[index + 1].trim())
    ) {
      const header = parseTableRow(trimmed)
      const rows: string[][] = []
      index += 2

      while (index < lines.length && lines[index].trim().includes('|')) {
        rows.push(parseTableRow(lines[index].trim()))
        index += 1
      }

      blocks.push(
        <div className="legal-table-wrap" key={blocks.length}>
          <table>
            <thead>
              <tr>
                {header.map((cell, cellIndex) => (
                  <th key={cellIndex}>{renderInline(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      continue
    }

    if (trimmed.startsWith('- ')) {
      const items: string[] = []

      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push(lines[index].trim().slice(2))
        index += 1
      }

      blocks.push(
        <ul key={blocks.length}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item)}</li>
          ))}
        </ul>,
      )
      continue
    }

    const paragraphLines = [trimmed]
    index += 1

    while (index < lines.length) {
      const next = lines[index].trim()

      if (
        !next ||
        next.startsWith('#') ||
        next.startsWith('- ') ||
        (next.includes('|') &&
          index + 1 < lines.length &&
          tableDividerPattern.test(lines[index + 1].trim()))
      ) {
        break
      }

      paragraphLines.push(next)
      index += 1
    }

    blocks.push(<p key={blocks.length}>{renderInline(paragraphLines.join(' '))}</p>)
  }

  return blocks
}

export default function LegalDocumentPage({ title, markdown }: LegalDocumentPageProps) {
  return (
    <main className="legal-page">
      <article className="legal-document" aria-label={title}>
        {renderMarkdown(markdown)}
      </article>
    </main>
  )
}
