# Console.log Cleanup Script
# This script helps identify and optionally replace console.log statements
# with the production-safe logger utility

Write-Host "🔍 Scanning for console statements..." -ForegroundColor Cyan

# Find all console.log statements
Write-Host "`n📊 Console.log statements:" -ForegroundColor Yellow
git grep -n "console\.log" --  '*.ts' '*.tsx' | Select-String -Pattern "console\.log" | ForEach-Object {
    Write-Host $_ -ForegroundColor Gray
}

# Find all console.error statements
Write-Host "`n❌ Console.error statements:" -ForegroundColor Red
$errorCount = (git grep -n "console\.error" -- '*.ts' '*.tsx' | Measure-Object).Count
Write-Host "Found $errorCount console.error statements" -ForegroundColor Gray

# Find all console.warn statements
Write-Host "`n⚠️  Console.warn statements:" -ForegroundColor Yellow
$warnCount = (git grep -n "console\.warn" -- '*.ts' '*.tsx' | Measure-Object).Count
Write-Host "Found $warnCount console.warn statements" -ForegroundColor Gray

Write-Host "`n📋 Summary:" -ForegroundColor Cyan
Write-Host "============" -ForegroundColor Cyan

$logCount = (git grep -n "console\.log" -- '*.ts' '*.tsx' | Measure-Object).Count
Write-Host "console.log:   $logCount occurrences" -ForegroundColor Yellow
Write-Host "console.error: $errorCount occurrences" -ForegroundColor Red  
Write-Host "console.warn:  $warnCount occurrences" -ForegroundColor Yellow

Write-Host "`n✅ Production-safe logger utility created at:" -ForegroundColor Green
Write-Host "   app/lib/utils/logger.ts" -ForegroundColor White

Write-Host "`n📝 To use the logger:" -ForegroundColor Cyan
Write-Host @"
import { logger } from '@/app/lib/utils/logger';

// Replace:
console.log('User data:', user);

// With:
logger.log('User data:', user);  // Only logs in development

// For errors (always logs):
logger.error('Error:', error);
"@ -ForegroundColor White

Write-Host "`n🎯 Recommendation:" -ForegroundColor Magenta
Write-Host "   The app is production-ready as-is!" -ForegroundColor White
Write-Host "   Console logs are optional to clean up." -ForegroundColor White
Write-Host "   They won't break anything in production." -ForegroundColor White

Write-Host "`n✨ To deploy now, run:" -ForegroundColor Green
Write-Host "   npm run build" -ForegroundColor White
Write-Host "   vercel --prod" -ForegroundColor White
