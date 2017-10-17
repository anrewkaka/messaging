package xyz.lannt.chart;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/notification")
public class NotificationController {

  @RequestMapping("/index")
  public String get() {
    return "public/index";
  }
}

