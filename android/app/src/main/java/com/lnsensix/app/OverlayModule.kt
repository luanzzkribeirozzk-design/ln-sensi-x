package com.lnsensix.app

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.os.VibrationEffect
import android.os.Vibrator
import android.view.Gravity
import android.view.MotionEvent
import android.view.WindowManager
import android.widget.Button
import android.widget.FrameLayout
import androidx.core.app.NotificationCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class OverlayModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var isShowing = false

    override fun getName() = "OverlayModule"

    @ReactMethod
    fun showOverlay(promise: Promise) {
        try {
            val context = reactApplicationContext
            val intent = Intent(context, FloatingOverlayService::class.java)
            intent.action = "START_OVERLAY"
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(intent)
            } else {
                context.startService(intent)
            }
            isShowing = true
            promise.resolve("Overlay iniciado")
        } catch (e: Exception) {
            promise.reject("OVERLAY_ERROR", e.message)
        }
    }

    @ReactMethod
    fun hideOverlay(promise: Promise) {
        try {
            val context = reactApplicationContext
            val intent = Intent(context, FloatingOverlayService::class.java)
            context.stopService(intent)
            isShowing = false
            promise.resolve("Overlay parado")
        } catch (e: Exception) {
            promise.reject("OVERLAY_ERROR", e.message)
        }
    }

    @ReactMethod
    fun isOverlayVisible(promise: Promise) {
        promise.resolve(isShowing)
    }
}

class FloatingOverlayService : Service() {

    private var windowManager: WindowManager? = null
    private var overlayView: FrameLayout? = null
    private var trickButton: Button? = null

    companion object {
        private const val CHANNEL_ID = "ln_sensi_x_overlay"
        private const val NOTIFICATION_ID = 1001
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            "START_OVERLAY" -> {
                startForegroundNotification()
                startOverlay()
            }
            "STOP_OVERLAY" -> stopOverlay()
        }
        return START_STICKY
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "LN SENSI X Overlay",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Serviço de overlay flutuante"
                setShowBadge(false)
            }
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }
    }

    private fun startForegroundNotification() {
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("LN SENSI X")
            .setContentText("Overlay ativo — botão TRICK visível")
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setOngoing(true)
            .build()
        startForeground(NOTIFICATION_ID, notification)
    }

    private fun startOverlay() {
        try {
            if (overlayView != null) return

            windowManager = getSystemService(Context.WINDOW_SERVICE) as WindowManager
            overlayView = FrameLayout(this).apply {
                setBackgroundColor(Color.TRANSPARENT)
            }

            trickButton = Button(this).apply {
                text = "TRICK"
                setBackgroundColor(0xFF9D4EDD.toInt())
                setTextColor(0xFFFFFFFF.toInt())
                textSize = 13f
                isAllCaps = false
                setPadding(8, 8, 8, 8)

                setOnClickListener {
                    @Suppress("DEPRECATION")
                    val vibrator = this@FloatingOverlayService
                        .getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        vibrator.vibrate(
                            VibrationEffect.createOneShot(
                                100,
                                VibrationEffect.DEFAULT_AMPLITUDE
                            )
                        )
                    } else {
                        @Suppress("DEPRECATION")
                        vibrator.vibrate(100)
                    }
                }
            }

            var dX = 0f
            var dY = 0f

            trickButton?.setOnTouchListener { v, event ->
                when (event.action) {
                    MotionEvent.ACTION_DOWN -> {
                        dX = v.x - event.rawX
                        dY = v.y - event.rawY
                    }
                    MotionEvent.ACTION_MOVE -> {
                        val newX = event.rawX + dX
                        val newY = event.rawY + dY
                        v.animate().x(newX).y(newY).setDuration(0).start()
                    }
                    MotionEvent.ACTION_UP -> {
                        v.performClick()
                    }
                }
                true
            }

            val btnSize = 220
            overlayView?.addView(
                trickButton,
                FrameLayout.LayoutParams(btnSize, btnSize)
            )

            val layoutType = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            } else {
                @Suppress("DEPRECATION")
                WindowManager.LayoutParams.TYPE_SYSTEM_ALERT
            }

            val params = WindowManager.LayoutParams(
                WindowManager.LayoutParams.MATCH_PARENT,
                WindowManager.LayoutParams.MATCH_PARENT,
                layoutType,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                        WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or
                        WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS or
                        WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON,
                PixelFormat.TRANSLUCENT
            ).apply {
                gravity = Gravity.TOP or Gravity.START
                x = 0
                y = 100
            }

            windowManager?.addView(overlayView, params)

        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun stopOverlay() {
        try {
            if (overlayView != null && windowManager != null) {
                windowManager?.removeView(overlayView)
                overlayView = null
                trickButton = null
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        super.onDestroy()
        stopOverlay()
    }
}
