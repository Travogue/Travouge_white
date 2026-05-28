@echo off
cd /d D:\vidhya\Travouge\frontend\src
del /q *.tsx
cd pages
del /q *.tsx
cd ..\components
del /q *.tsx
cd ..
del /q api.ts theme.ts types.ts
echo Cleanup complete!
