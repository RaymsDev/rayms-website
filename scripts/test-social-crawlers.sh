#!/bin/bash

# Social Media Crawler Test Script
# Run this after deploying to verify Facebook crawler access

DOMAIN="https://remy.laffuge.fr"

echo "🔍 Testing Social Media Crawler Access for $DOMAIN"
echo "================================================="

# Test robots.txt accessibility
echo -e "\n📋 Testing robots.txt..."
curl -s -o /dev/null -w "Status: %{http_code}" "$DOMAIN/robots.txt"
echo ""

# Test sitemap.xml accessibility
echo -e "\n🗺️ Testing sitemap.xml..."
curl -s -o /dev/null -w "Status: %{http_code}" "$DOMAIN/sitemap.xml"
echo ""

# Test Open Graph image accessibility
echo -e "\n🖼️ Testing Open Graph image..."
curl -s -o /dev/null -w "Status: %{http_code}" "$DOMAIN/og-image.jpg"
echo ""

# Test main page with Facebook User Agent
echo -e "\n🤖 Testing with Facebook crawler user agent..."
curl -s -H "User-Agent: facebookexternalhit/1.1" -o /dev/null -w "Status: %{http_code}" "$DOMAIN/"
echo ""

# Test expedition-33 page with Facebook User Agent
echo -e "\n🚀 Testing Expedition 33 page with Facebook crawler..."
curl -s -H "User-Agent: facebookexternalhit/1.1" -o /dev/null -w "Status: %{http_code}" "$DOMAIN/expedition-33"
echo ""

echo -e "\n✅ Test completed!"
echo "All responses should show 'Status: 200' for successful access"
echo ""
echo "🔧 Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/?q=$DOMAIN"
echo "🐦 Twitter Card Validator: https://cards-dev.twitter.com/validator"
