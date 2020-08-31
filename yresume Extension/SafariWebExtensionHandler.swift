//
//  SafariWebExtensionHandler.swift
//  yresume Extension
//
//  Created by Furkan Duman on 29.08.2020.
//

import SafariServices
import os.log

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {
    
    func beginRequest(with context: NSExtensionContext) {
        // Unpack the message from Safari Web Extension.
        let item = context.inputItems[0] as? NSExtensionItem
        let message = item?.userInfo?[SFExtensionMessageKey]
        
        let defaults = UserDefaults(suiteName: "com.furkanduman.yresume.group")
        let messageDictionary = message as? [String: String]
        
        if messageDictionary?["type"] == "add-title" {
            let title = messageDictionary!["title"]!;
            let url = messageDictionary!["url"]!;
            var dict = defaults?.object(forKey: "SavedTitles") as? [String: String] ?? [String: String]();
            dict.updateValue(url, forKey: title);
            defaults?.set(dict, forKey: "SavedTitles");
            let response = NSExtensionItem()
            response.userInfo = [ SFExtensionMessageKey: "OK"]
            context.completeRequest(returningItems: [response], completionHandler: nil)
        } else if messageDictionary?["type"] == "send-title" {
            let title = messageDictionary!["title"]!;
            let url = messageDictionary!["url"]!;
            var dict = defaults?.object(forKey: "SavedTitles") as? [String: String] ?? [String: String]()
            if (dict[title] != nil) {
                dict.updateValue(url, forKey: title);
                defaults?.set(dict, forKey: "SavedTitles");
            }
            let response = NSExtensionItem()
            response.userInfo = [ SFExtensionMessageKey: "OK"]
            context.completeRequest(returningItems: [response], completionHandler: nil)
        } else if messageDictionary?["type"] == "get-titles" {
            let dict = defaults?.object(forKey: "SavedTitles") as? [String: String] ?? [String: String]()
            let response = NSExtensionItem()
            response.userInfo = [ SFExtensionMessageKey: dict]
            context.completeRequest(returningItems: [response], completionHandler: nil)
        } else if messageDictionary?["type"] == "clear-titles" {
            defaults?.removeObject(forKey: "SavedTitles");
            let response = NSExtensionItem()
            response.userInfo = [ SFExtensionMessageKey: "OK"]
            context.completeRequest(returningItems: [response], completionHandler: nil)
        }
        
    }
    
}
