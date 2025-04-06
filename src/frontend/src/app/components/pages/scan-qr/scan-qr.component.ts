import { Component, OnInit, OnDestroy } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Router } from '@angular/router';


@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrl: './scan-qr.component.css'
})
export class ScanQrComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}
  scannerEnabled = true;
  torchEnabled = false;
  hasPermission = false;
  selectedDevice: MediaDeviceInfo | null = null;
  qrResult: string | null = null;

  async ngOnInit() {
    await this.checkCameraPermissions();
  }

  ngOnDestroy() {
    this.scannerEnabled = false;
  }

  async checkCameraPermissions() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      this.hasPermission = true;
    } catch (error) {
      console.error('Camera permission denied:', error);
      this.hasPermission = false;
      document.body.style.backgroundColor = 'white';
    }
  }
  

  async handleQrCodeResult(result: string) {
    this.qrResult = result;
    this.scannerEnabled = false;
    
    await Haptics.impact({ style: ImpactStyle.Medium });
    this.router.navigate([this.qrResult]);
  }

  camerasFoundHandler(devices: MediaDeviceInfo[]) {
    this.selectedDevice = devices.find(device => device.kind === 'videoinput') || null;
  }

  hasPermissionHandler(hasPermission: boolean) {
    if (!hasPermission) {
      alert('Camera permission is required to scan QR codes!');
    }
  }

  resetScanner() {
    this.qrResult = null;
    this.scannerEnabled = true;
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
