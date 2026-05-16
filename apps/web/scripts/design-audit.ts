#!/usr/bin/env ts-node
import * as fs from 'fs'
import * as path from 'path'
import { SYNTHIA_RULES } from '../design-system/synthia-rules'

const appDir = path.join(__dirname, '../app')
const outputDir = path.join(__dirname, '../.audit')
const outputPath = path.join(outputDir, 'design-audit.md')

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

interface Violation { file: string; term: string; type: string }
const violations: Violation[] = []

function scanFile(filePath: string, content: string) {
  for (const term of SYNTHIA_RULES.forbiddenPublicTerms) {
    if (content.includes(term)) {
      violations.push({ file: filePath.replace(appDir, 'app'), term, type: 'forbidden_term' })
    }
  }
  for (const font of SYNTHIA_RULES.typography.forbidden) {
    if (content.includes(font)) {
      violations.push({ file: filePath.replace(appDir, 'app'), term: font, type: 'forbidden_font' })
    }
  }
}

function walkDir(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory() && !['node_modules', '.next', 'dist'].includes(entry.name)) walkDir(full)
    else if (entry.isFile() && /\.(tsx?|css)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf-8')
      scanFile(full, content)
    }
  }
}

walkDir(appDir)

const score = Math.max(0, 10 - violations.length * 0.3)
const passed = score >= SYNTHIA_RULES.qualityFloor

const report = `# CheggieTrade Design Audit
Generated: ${new Date().toISOString()}

## Score: ${score.toFixed(1)} / 10 ${passed ? '✅ PASS' : '❌ FAIL — below 8.5 floor'}

## Quality Floor: ${SYNTHIA_RULES.qualityFloor}

## Violations (${violations.length})
${violations.length === 0 ? 'None found.' : violations.map((v) => `- [${v.type}] ${v.file}: "${v.term}"`).join('\n')}

## Status
${passed ? 'Design audit passed. Ready to ship.' : 'FAIL: Fix all violations before shipping.'}
`

fs.writeFileSync(outputPath, report)
console.log(report)
process.exit(passed ? 0 : 1)
